import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import { useLang } from "../context/LanguageContext";
import { STRINGS } from "../i18n";
import { Reveal } from "./Reveal";

const CATEGORY_ORDER = ["Hot", "Cold", "Drip Coffee", "Mojito"];

export default function MenuSection({ items, onSelect }) {
  const { t, lang, pick } = useLang();
  const [active, setActive] = useState(null);

  const categories = useMemo(() => {
    const present = CATEGORY_ORDER.filter((c) => items.some((i) => i.category === c));
    return present;
  }, [items]);

  const current = active || categories[0];
  const filtered = items.filter((i) => i.category === current);

  return (
    <section id="menu" className="relative py-24 sm:py-32 px-5 sm:px-10 max-w-7xl mx-auto">
      <Reveal>
        <p className="text-xs tracking-[0.35em] uppercase text-dot-gold mb-4">{t(STRINGS.menu.kicker)}</p>
        <h2 className="font-display text-5xl sm:text-7xl text-dot-cream mb-10">{t(STRINGS.menu.title)}</h2>
      </Reveal>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-14 overflow-x-auto hide-scrollbar" data-testid="menu-categories">
        {categories.map((c) => (
          <button
            key={c}
            data-testid={`category-${c.replace(/\s+/g, "-").toLowerCase()}`}
            onClick={() => setActive(c)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs tracking-[0.15em] uppercase border transition-colors ${
              current === c ? "bg-dot-gold text-black border-dot-gold" : "border-white/15 text-dot-gray hover:border-white/40 hover:text-dot-cream"
            }`}
          >
            {t(STRINGS.categories[c]) || c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="menu-grid">
        {filtered.map((item, idx) => (
          <motion.button
            key={item.id}
            data-testid={`product-card-${item.id}`}
            onClick={() => onSelect(item)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (idx % 3) * 0.08 }}
            className="group text-left rtl:text-right bg-dot-card border border-white/5 hover:border-dot-gold/40 rounded-2xl overflow-hidden transition-colors"
          >
            <div className="relative h-56 overflow-hidden">
              <img src={item.image} alt={pick(item.name_en, item.name_ar)} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-dot-card via-transparent to-transparent" />
              {!item.available && (
                <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase px-2 py-1 rounded bg-black/70 text-dot-gray">{t(STRINGS.menu.soldOut)}</span>
              )}
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl text-dot-cream leading-tight">{pick(item.name_en, item.name_ar)}</h3>
                <span className="shrink-0 font-medium text-dot-gold">{item.price} <span className="text-xs">{lang === "ar" ? "ر.س" : "SAR"}</span></span>
              </div>
              <p className="mt-2 text-sm text-dot-gray line-clamp-2 leading-relaxed">{pick(item.desc_en, item.desc_ar)}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase text-dot-gold/90 group-hover:gap-2.5 transition-all">
                <Plus size={14} weight="bold" /> {t(STRINGS.menu.viewDetails)}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
