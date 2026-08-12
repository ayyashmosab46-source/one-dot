from dotenv import load_dotenv
from pathlib import Path
import os

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, BeforeValidator, ConfigDict
from typing import List, Optional, Annotated, Any
from bson import ObjectId
from datetime import datetime, timezone, timedelta
import logging
import jwt
import bcrypt

# ------------------------------------------------------------------ DB
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_ALGORITHM = "HS256"

app = FastAPI()
api_router = APIRouter(prefix="/api")

# ------------------------------------------------------------------ Models
PyObjectId = Annotated[str, BeforeValidator(lambda v: str(v) if isinstance(v, ObjectId) else v)]


class MenuOption(BaseModel):
    label_en: str = ""
    label_ar: str = ""
    price_delta: float = 0


class MenuItem(BaseModel):
    model_config = ConfigDict(populate_by_name=True, extra="ignore")
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    name_en: str
    name_ar: str = ""
    desc_en: str = ""
    desc_ar: str = ""
    ingredients_en: str = ""
    ingredients_ar: str = ""
    price: float = 0
    category: str = "Hot Coffee"
    image: str = ""
    options: List[MenuOption] = []
    addons: List[MenuOption] = []
    is_signature: bool = False
    signature_no: str = ""
    order: int = 0
    available: bool = True


class MenuItemCreate(BaseModel):
    name_en: str
    name_ar: str = ""
    desc_en: str = ""
    desc_ar: str = ""
    ingredients_en: str = ""
    ingredients_ar: str = ""
    price: float = 0
    category: str = "Hot Coffee"
    image: str = ""
    options: List[MenuOption] = []
    addons: List[MenuOption] = []
    is_signature: bool = False
    signature_no: str = ""
    order: int = 0
    available: bool = True


class Review(BaseModel):
    name_en: str
    name_ar: str = ""
    text_en: str
    text_ar: str = ""
    rating: float = 5


class Settings(BaseModel):
    model_config = ConfigDict(extra="ignore")
    rating: float = 4.5
    reviews_count: int = 210
    price_min: int = 20
    price_max: int = 40
    address_en: str = "Mecca 24226, Saudi Arabia"
    address_ar: str = "مكة المكرمة، 24226"
    plus_code: str = "FQ27+22"
    maps_url: str = "https://www.google.com/maps/search/?api=1&query=FQ27%2B22+Mecca"
    directions_url: str = "https://www.google.com/maps/dir/?api=1&destination=FQ27%2B22+Mecca"
    whatsapp: str = ""
    instagram: str = ""
    hours_weekday_en: str = "Sat – Thu · 6:30 AM — 2:30 AM"
    hours_weekday_ar: str = "السبت – الخميس · 6:30 ص — 2:30 ص"
    hours_friday_en: str = "Friday · 4:30 PM — 3:00 AM"
    hours_friday_ar: str = "الجمعة · 4:30 م — 3:00 ص"
    gallery: List[str] = []
    instagram_grid: List[str] = []
    reviews: List[Review] = []


class LoginInput(BaseModel):
    email: str
    password: str


# ------------------------------------------------------------------ Auth helpers
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


def create_access_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email,
               "exp": datetime.now(timezone.utc) + timedelta(hours=12), "type": "access"}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


def create_refresh_token(user_id: str) -> str:
    payload = {"sub": user_id, "exp": datetime.now(timezone.utc) + timedelta(days=7), "type": "refresh"}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        user["_id"] = str(user["_id"])
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ------------------------------------------------------------------ Auth routes
@api_router.post("/auth/login")
async def login(data: LoginInput, response: Response):
    email = data.email.lower().strip()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(data.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    uid = str(user["_id"])
    access = create_access_token(uid, email)
    refresh = create_refresh_token(uid)
    response.set_cookie("access_token", access, httponly=True, secure=True, samesite="none", max_age=43200, path="/")
    response.set_cookie("refresh_token", refresh, httponly=True, secure=True, samesite="none", max_age=604800, path="/")
    return {"id": uid, "email": email, "name": user.get("name", "Admin"), "role": user.get("role", "admin"), "token": access}


@api_router.get("/auth/me")
async def me(user: dict = Depends(get_current_user)):
    return {"id": user["_id"], "email": user["email"], "name": user.get("name", "Admin"), "role": user.get("role", "admin")}


@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"ok": True}


# ------------------------------------------------------------------ Public routes
@api_router.get("/menu")
async def get_menu():
    items = await db.menu.find().sort("order", 1).to_list(1000)
    return [MenuItem.model_validate(i).model_dump(by_alias=False) for i in items]


@api_router.get("/settings")
async def get_settings():
    doc = await db.settings.find_one({"_id": "site"})
    if not doc:
        return Settings().model_dump()
    doc.pop("_id", None)
    return Settings(**doc).model_dump()


# ------------------------------------------------------------------ Admin routes
@api_router.post("/admin/menu")
async def create_item(data: MenuItemCreate, user: dict = Depends(get_current_user)):
    doc = data.model_dump()
    res = await db.menu.insert_one(doc)
    created = await db.menu.find_one({"_id": res.inserted_id})
    return MenuItem.model_validate(created).model_dump(by_alias=False)


@api_router.put("/admin/menu/{item_id}")
async def update_item(item_id: str, data: MenuItemCreate, user: dict = Depends(get_current_user)):
    await db.menu.update_one({"_id": ObjectId(item_id)}, {"$set": data.model_dump()})
    updated = await db.menu.find_one({"_id": ObjectId(item_id)})
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return MenuItem.model_validate(updated).model_dump(by_alias=False)


@api_router.delete("/admin/menu/{item_id}")
async def delete_item(item_id: str, user: dict = Depends(get_current_user)):
    await db.menu.delete_one({"_id": ObjectId(item_id)})
    return {"ok": True}


@api_router.put("/admin/settings")
async def update_settings(data: Settings, user: dict = Depends(get_current_user)):
    payload = data.model_dump()
    await db.settings.update_one({"_id": "site"}, {"$set": payload}, upsert=True)
    return payload


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# ------------------------------------------------------------------ Seeding
async def seed_admin():
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@onedot.cafe").lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "admin123")
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        await db.users.insert_one({
            "email": admin_email, "password_hash": hash_password(admin_password),
            "name": "One Dot Admin", "role": "admin", "created_at": datetime.now(timezone.utc).isoformat()})
        logger.info("Admin seeded")
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one({"email": admin_email}, {"$set": {"password_hash": hash_password(admin_password)}})


async def seed_content():
    from seed_data import MENU_ITEMS, SETTINGS
    if await db.menu.count_documents({}) == 0:
        await db.menu.insert_many([dict(i) for i in MENU_ITEMS])
        logger.info("Menu seeded")
    if await db.settings.find_one({"_id": "site"}) is None:
        doc = dict(SETTINGS)
        doc["_id"] = "site"
        await db.settings.insert_one(doc)
        logger.info("Settings seeded")


@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await seed_admin()
    await seed_content()


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
