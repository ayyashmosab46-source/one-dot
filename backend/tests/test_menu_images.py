"""Backend tests: verify /api/menu returns 26 items, all with valid distinct images."""
import os
import re
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://find-your-dot.preview.emergentagent.com").rstrip("/")

EXPECTED_SLUGS = {
    "Americano": "photo-1521302080334",
    "Macchiato": "photo-1485808191679",
    "Cortado": "photo-1559496417",
    "Flat White": "photo-1690609561635",
    "Latte": "photo-1561882468",
    "Spanish Latte": "photo-1570968915860",
    "Caramel Latte": "photo-1780285575743",
    "White Mocha": "photo-1475759697283",
    "Hot Chocolate": "photo-1637572815755",
    "Ice White Mocha": "photo-1517701550927",
    "Ice Caramel Latte": "photo-1687803799209",
}


@pytest.fixture(scope="module")
def menu():
    r = requests.get(f"{BASE_URL}/api/menu", timeout=30)
    assert r.status_code == 200, f"GET /api/menu -> {r.status_code}: {r.text[:300]}"
    data = r.json()
    assert isinstance(data, list), f"expected list, got {type(data)}"
    return data


def test_menu_count(menu):
    assert len(menu) == 26, f"Expected 26 items, got {len(menu)}"


def test_all_items_have_image(menu):
    missing = [i.get("name_en") for i in menu if not i.get("image")]
    assert not missing, f"Items missing image: {missing}"


def test_all_images_reachable(menu):
    broken = []
    for i in menu:
        url = i["image"]
        try:
            r = requests.head(url, allow_redirects=True, timeout=15)
            if r.status_code >= 400:
                # Some CDNs reject HEAD; retry GET
                r = requests.get(url, timeout=15, stream=True)
            if r.status_code >= 400:
                broken.append((i["name_en"], url, r.status_code))
        except Exception as e:
            broken.append((i["name_en"], url, str(e)))
    assert not broken, f"Broken images: {broken}"


def test_hot_cold_distinct_images(menu):
    for cat in ("Hot", "Cold"):
        items = [i for i in menu if i.get("category") == cat]
        urls = [i["image"] for i in items]
        dupes = {u for u in urls if urls.count(u) > 1}
        if dupes:
            names = [(i["name_en"], i["image"]) for i in items if i["image"] in dupes]
            pytest.fail(f"Duplicate images in {cat}: {names}")


def test_previously_duplicated_are_unique(menu):
    targets = ["Cortado", "Flat White", "Latte", "Caramel Latte", "Macchiato", "Cappuccino"]
    by_name = {i["name_en"]: i["image"] for i in menu}
    urls = [by_name[n] for n in targets if n in by_name]
    assert len(set(urls)) == len(urls), f"Not unique among {targets}: {list(zip(targets, urls))}"


def test_expected_slug_assignments(menu):
    by_name = {i["name_en"]: i["image"] for i in menu}
    mismatches = []
    for name, slug in EXPECTED_SLUGS.items():
        img = by_name.get(name)
        assert img, f"Missing item: {name}"
        if slug not in img:
            mismatches.append((name, slug, img))
    assert not mismatches, f"Slug mismatches: {mismatches}"
