# Seed content for One Dot. Realistic placeholder menu — editable via admin.

HERO = "https://images.unsplash.com/photo-1549035975-7ca0d2ce5033?auto=format&fit=crop&w=1600&q=85"

IMG = {
    "cappuccino": "https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=1200&q=80",
    "latte": "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?auto=format&fit=crop&w=1200&q=80",
    "hot": "https://images.unsplash.com/photo-1502208641-6f4169d01578?auto=format&fit=crop&w=1200&q=80",
    "cold": "https://images.unsplash.com/photo-1642647391072-6a2416f048e5?auto=format&fit=crop&w=1200&q=80",
    "matcha": "https://images.pexels.com/photos/14704657/pexels-photo-14704657.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "matcha2": "https://images.unsplash.com/photo-1759006249055-8c4030a2d56a?auto=format&fit=crop&w=1200&q=80",
    "dessert": "https://images.unsplash.com/photo-1769434129087-52fbe83d3d00?auto=format&fit=crop&w=1200&q=80",
    "cake": "https://images.unsplash.com/photo-1458253756247-1e4ed949191b?auto=format&fit=crop&w=1200&q=80",
    "cupcake": "https://images.unsplash.com/photo-1590741664176-7fbd7e2592a0?auto=format&fit=crop&w=1200&q=80",
    "plate": "https://images.unsplash.com/photo-1637944220604-c5f28faac604?auto=format&fit=crop&w=1200&q=80",
    "sig1": "https://images.unsplash.com/photo-1764361276489-79b17d9a8782?auto=format&fit=crop&w=1600&q=85",
    "sig2": "https://images.unsplash.com/photo-1762521062351-90612528d811?auto=format&fit=crop&w=1600&q=85",
    "sig3": "https://images.unsplash.com/photo-1549035975-7ca0d2ce5033?auto=format&fit=crop&w=1600&q=85",
}


def item(**kw):
    base = dict(name_ar="", desc_en="", desc_ar="", ingredients_en="", ingredients_ar="",
               price=0, category="Hot Coffee", image="", options=[], addons=[],
               is_signature=False, signature_no="", order=0, available=True)
    base.update(kw)
    return base


MILK_OPTS = [
    {"label_en": "Regular Milk", "label_ar": "حليب عادي", "price_delta": 0},
    {"label_en": "Oat Milk", "label_ar": "حليب الشوفان", "price_delta": 3},
    {"label_en": "Almond Milk", "label_ar": "حليب اللوز", "price_delta": 3},
]
ADDONS = [
    {"label_en": "Extra Shot", "label_ar": "جرعة إضافية", "price_delta": 4},
    {"label_en": "Vanilla Syrup", "label_ar": "سيرب فانيلا", "price_delta": 3},
    {"label_en": "Caramel Syrup", "label_ar": "سيرب كراميل", "price_delta": 3},
]

MENU_ITEMS = [
    # Signature
    item(name_en="The Golden Dot", name_ar="النقطة الذهبية", signature_no="01", is_signature=True,
         category="Signature Drinks", price=32, image=IMG["sig1"], order=1,
         desc_en="Our house espresso layered with saffron-infused milk and a whisper of honey.",
         desc_ar="إسبريسو المنزل مع حليب منقوع بالزعفران ولمسة من العسل.",
         ingredients_en="Double espresso, saffron milk, honey, gold dust",
         ingredients_ar="إسبريسو مزدوج، حليب الزعفران، عسل، ذهب صالح للأكل",
         options=MILK_OPTS, addons=ADDONS),
    item(name_en="Dark Matter", name_ar="المادة المظلمة", signature_no="02", is_signature=True,
         category="Signature Drinks", price=30, image=IMG["sig2"], order=2,
         desc_en="An intense triple ristretto over cold brew ice with dark cocoa.",
         desc_ar="ريستريتو ثلاثي مركّز فوق ثلج الكولد برو مع كاكاو داكن.",
         ingredients_en="Triple ristretto, cold brew, dark cocoa",
         ingredients_ar="ريستريتو ثلاثي، كولد برو، كاكاو داكن",
         options=MILK_OPTS, addons=ADDONS),
    item(name_en="Meccan Rose", name_ar="وردة مكة", signature_no="03", is_signature=True,
         category="Signature Drinks", price=28, image=IMG["sig3"], order=3,
         desc_en="Rose water latte with cardamom and a delicate pistachio crumble.",
         desc_ar="لاتيه ماء الورد مع الهيل وفتات الفستق الرقيق.",
         ingredients_en="Espresso, rose water, cardamom, pistachio",
         ingredients_ar="إسبريسو، ماء ورد، هيل، فستق",
         options=MILK_OPTS, addons=ADDONS),

    # Hot Coffee
    item(name_en="Spanish Latte", name_ar="سبانيش لاتيه", category="Hot Coffee", price=22,
         image=IMG["latte"], order=10, desc_en="Sweet condensed milk meets bold espresso.",
         desc_ar="حليب مكثّف محلّى مع إسبريسو غني.",
         ingredients_en="Espresso, condensed milk, steamed milk", ingredients_ar="إسبريسو، حليب مكثّف، حليب مبخّر",
         options=MILK_OPTS, addons=ADDONS),
    item(name_en="Cappuccino", name_ar="كابتشينو", category="Hot Coffee", price=18, image=IMG["cappuccino"],
         order=11, desc_en="Classic balance of espresso, milk and velvet foam.",
         desc_ar="توازن كلاسيكي من الإسبريسو والحليب والرغوة.",
         ingredients_en="Espresso, steamed milk, foam", ingredients_ar="إسبريسو، حليب مبخّر، رغوة",
         options=MILK_OPTS, addons=ADDONS),
    item(name_en="Flat White", name_ar="فلات وايت", category="Hot Coffee", price=19, image=IMG["hot"],
         order=12, desc_en="Silky microfoam over a double ristretto.",
         desc_ar="رغوة حريرية فوق ريستريتو مزدوج.",
         ingredients_en="Double ristretto, microfoam", ingredients_ar="ريستريتو مزدوج، رغوة دقيقة",
         options=MILK_OPTS, addons=ADDONS),

    # Cold Coffee
    item(name_en="Iced Spanish Latte", name_ar="آيس سبانيش لاتيه", category="Cold Coffee", price=24,
         image=IMG["cold"], order=20, desc_en="Our signature Spanish latte, served over ice.",
         desc_ar="السبانيش لاتيه المميز مقدّم مع الثلج.",
         ingredients_en="Espresso, condensed milk, milk, ice", ingredients_ar="إسبريسو، حليب مكثّف، حليب، ثلج",
         options=MILK_OPTS, addons=ADDONS),
    item(name_en="Cold Brew", name_ar="كولد برو", category="Cold Coffee", price=21, image=IMG["latte"],
         order=21, desc_en="18-hour slow steeped, smooth and low acidity.",
         desc_ar="منقوع ببطء 18 ساعة، ناعم وقليل الحموضة.",
         ingredients_en="Cold brew concentrate, water, ice", ingredients_ar="مركّز كولد برو، ماء، ثلج",
         addons=ADDONS),

    # Matcha
    item(name_en="Iced Matcha Latte", name_ar="آيس ماتشا لاتيه", category="Matcha", price=25, image=IMG["matcha"],
         order=30, desc_en="Ceremonial grade matcha whisked with cold milk.",
         desc_ar="ماتشا درجة احتفالية مخفوقة مع حليب بارد.",
         ingredients_en="Ceremonial matcha, milk, ice", ingredients_ar="ماتشا احتفالية، حليب، ثلج",
         options=MILK_OPTS, addons=ADDONS),
    item(name_en="Matcha Cloud", name_ar="ماتشا كلاود", category="Matcha", price=27, image=IMG["matcha2"],
         order=31, desc_en="Layered matcha with a light sweet cream cloud.",
         desc_ar="ماتشا متعدد الطبقات مع كريمة حلوة خفيفة.",
         ingredients_en="Matcha, milk, sweet cream", ingredients_ar="ماتشا، حليب، كريمة حلوة",
         options=MILK_OPTS),

    # Non-Coffee
    item(name_en="Spiced Karak", name_ar="كرك بالبهارات", category="Non-Coffee", price=14, image=IMG["hot"],
         order=40, desc_en="Rich black tea with cardamom, saffron and milk.",
         desc_ar="شاي أسود غني بالهيل والزعفران والحليب.",
         ingredients_en="Black tea, cardamom, saffron, milk", ingredients_ar="شاي أسود، هيل، زعفران، حليب"),
    item(name_en="Hot Chocolate", name_ar="هوت شوكولت", category="Non-Coffee", price=20, image=IMG["cake"],
         order=41, desc_en="Melted dark chocolate and steamed milk.",
         desc_ar="شوكولاتة داكنة ذائبة وحليب مبخّر.",
         ingredients_en="Dark chocolate, milk", ingredients_ar="شوكولاتة داكنة، حليب", options=MILK_OPTS),

    # Desserts
    item(name_en="Chocolate Fondant", name_ar="فوندان الشوكولاتة", category="Desserts", price=29, image=IMG["dessert"],
         order=50, desc_en="Molten center dark chocolate cake.",
         desc_ar="كيكة شوكولاتة داكنة بقلب سائل.",
         ingredients_en="Dark chocolate, butter, egg, flour", ingredients_ar="شوكولاتة داكنة، زبدة، بيض، دقيق"),
    item(name_en="Pistachio Cheesecake", name_ar="تشيز كيك الفستق", category="Desserts", price=27, image=IMG["plate"],
         order=51, desc_en="Creamy cheesecake with roasted pistachio.",
         desc_ar="تشيز كيك كريمي مع فستق محمّص.",
         ingredients_en="Cream cheese, pistachio, biscuit", ingredients_ar="جبن كريمي، فستق، بسكويت"),
    item(name_en="Berry Cupcake", name_ar="كب كيك التوت", category="Desserts", price=18, image=IMG["cupcake"],
         order=52, desc_en="Vanilla cupcake with fresh berries.",
         desc_ar="كب كيك فانيلا مع توت طازج.",
         ingredients_en="Vanilla sponge, cream, berries", ingredients_ar="كيك فانيلا، كريمة، توت"),
]

SETTINGS = {
    "rating": 4.5,
    "reviews_count": 210,
    "price_min": 20,
    "price_max": 40,
    "address_en": "Mecca 24226, Saudi Arabia",
    "address_ar": "مكة المكرمة، 24226",
    "plus_code": "FQ27+22",
    "maps_url": "https://www.google.com/maps/search/?api=1&query=FQ27%2B22+Mecca",
    "directions_url": "https://www.google.com/maps/dir/?api=1&destination=FQ27%2B22+Mecca",
    "whatsapp": "",
    "instagram": "",
    "hours_weekday_en": "Sat – Thu · 6:30 AM — 2:30 AM",
    "hours_weekday_ar": "السبت – الخميس · 6:30 ص — 2:30 ص",
    "hours_friday_en": "Friday · 4:30 PM — 3:00 AM",
    "hours_friday_ar": "الجمعة · 4:30 م — 3:00 ص",
    "gallery": [
        "https://images.unsplash.com/photo-1709548145082-04d0cde481d4?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1583354608715-177553a4035e?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1645677020082-721a854c24f2?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1580644043501-627f569f7e25?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1458253756247-1e4ed949191b?auto=format&fit=crop&w=1000&q=80",
    ],
    "instagram_grid": [
        "https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1642647391072-6a2416f048e5?auto=format&fit=crop&w=600&q=80",
        "https://images.pexels.com/photos/14704657/pexels-photo-14704657.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.unsplash.com/photo-1769434129087-52fbe83d3d00?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1709548145082-04d0cde481d4?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1590741664176-7fbd7e2592a0?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1502208641-6f4169d01578?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1580644043501-627f569f7e25?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1637944220604-c5f28faac604?auto=format&fit=crop&w=600&q=80",
    ],
    "reviews": [
        {"name_en": "Layla A.", "name_ar": "ليلى ع.", "rating": 5,
         "text_en": "The Golden Dot is unlike anything in Mecca. Every detail feels intentional.",
         "text_ar": "النقطة الذهبية لا تشبه أي شيء في مكة. كل تفصيل مدروس."},
        {"name_en": "Omar K.", "name_ar": "عمر ك.", "rating": 4.5,
         "text_en": "Cozy, cinematic space and genuinely excellent espresso. My new spot.",
         "text_ar": "مكان دافئ وأنيق وإسبريسو ممتاز فعلاً. مكاني المفضّل الجديد."},
        {"name_en": "Sara M.", "name_ar": "سارة م.", "rating": 4.5,
         "text_en": "Matcha cloud and the desserts are worth the visit alone. Beautiful service.",
         "text_ar": "الماتشا كلاود والحلويات تستحق الزيارة وحدها. خدمة راقية."},
    ],
}
