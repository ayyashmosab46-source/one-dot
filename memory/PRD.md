# One Dot — ون دوت · PRD

## Original Problem Statement
Premium brand website for "One Dot – ون دوت", a specialty coffee shop in Mecca 24226 (Plus Code FQ27+22). Rating 4.5 / 210 reviews, avg price 20–40 SAR. Sections: kinetic Hero + stats, Menu (categorized product cards + details modal), One Dot Signature, Experience gallery, Location + hours + map, Reviews, Instagram grid, WhatsApp ordering, mobile sticky bar, bilingual EN/AR, dot-to-logo intro. Admin dashboard to manage products/prices/images/hours.

## User Choices
- Menu: real menu to be provided later → seeded realistic placeholder, editable via admin
- Admin: full protected dashboard (JWT auth)
- Order: WhatsApp buttons only (number added later via admin)
- Language: bilingual Arabic + English toggle with RTL
- Theme: dark premium (black / coffee brown + gold)

## Architecture
- Frontend: React 19, Tailwind, framer-motion, lenis smooth scroll, @phosphor-icons, sonner
- Backend: FastAPI + MongoDB (motor), JWT httpOnly-cookie auth (bcrypt), admin seeding
- Data: `menu` collection (products), `settings` doc (`_id: site`), `users` (admin)

## Personas
- Guest: browses menu, views details, orders via WhatsApp, finds location
- Owner/Admin: edits products, prices, images, hours, WhatsApp/Instagram, gallery

## Implemented (2026-06-12)
- Dot-to-logo intro animation ("Find your moment.")
- Kinetic parallax Hero with rating/price stats
- Editorial marquee
- Menu with category tabs + product cards + details modal (ingredients/options/add-ons)
- One Dot Signature full-bleed showcase
- Experience horizontal gallery (mobile swipe)
- Reviews with animated stars
- Location: dark map embed, Google Maps + Directions, hours, dine-in/takeaway
- WhatsApp order (toast fallback until number set)
- Instagram 3x3 grid
- Mobile sticky bar (Menu / Location / Order)
- Bilingual EN/AR toggle with RTL + Arabic fonts
- Admin: JWT login, product CRUD editor, settings editor (hours, WhatsApp, Instagram, gallery)

## Admin
- /login → /admin · admin@onedot.cafe / OneDot@2026 (see /app/memory/test_credentials.md)

## Backlog
- P1: Real One Dot menu data entry (via admin) once provided
- P1: WhatsApp number + official Instagram link (via admin settings)
- P2: SEO structured data (Cafe schema), sitemap, OG tags
- P2: Reviews editor + gallery upload (object storage) in admin
- P2: Breakfast/Food category items
