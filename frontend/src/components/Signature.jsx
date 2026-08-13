import { motion } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import { STRINGS } from "../i18n";
import { Reveal } from "./Reveal";

export default function Signature({ items, onSelect }) {
  const { t, lang, pick } = useLang();
  const sar = lang === "ar" ? "ر.س" : "SAR";
const sigs = Array.isArray(items) ? items.filter((i) => i.category === "Signature" || true) : [];
  if (sigs.length === 0) return null;

  return (
    <section id="signature" className="relative py-24 sm:py-32 bg-dot-surface">
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        <Reveal>
          <p className="text-xs tracking-[0.35em] uppercase text-dot-gold mb-4">{t(STRINGS.signature.kicker)}</p>
          <h2 className="font-display text-5xl sm:text-7xl text-dot-cream">{t(STRINGS.signature.title)}</h2>
          <p className="mt-4 max-w-lg text-dot-gray leading-relaxed">{t(STRINGS.signature.desc)}</p>
        </Reveal>
      </div>

      <div className="mt-16 space-y-2">
        {sigs.map((item, i) => (
          <motion.button
            key={item.id}
            data-testid={`signature-${item.id}`}
            onClick={() => onSelect(item)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative block w-full h-[70vh] overflow-hidden"
          >
            <img src={item.image} alt={pick(item.name_en, item.name_ar)} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
            <div className="absolute inset-0 bg-dot-bg/50 group-hover:bg-dot-bg/35 transition-colors" />
            <div className="relative h-full max-w-7xl mx-auto px-5 sm:px-10 flex flex-col justify-center items-start rtl:items-end text-left rtl:text-right">
              <span className="font-display text-8xl sm:text-[10rem] leading-none text-white/15">{item.signature_no || String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-4xl sm:text-6xl text-dot-cream -mt-6">{pick(item.name_en, item.name_ar)}</h3>
              <p className="mt-3 max-w-md text-dot-gray">{pick(item.desc_en, item.desc_ar)}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-dot-gold tracking-[0.2em] uppercase text-sm">
                {item.price} {sar} · {t(STRINGS.menu.viewDetails)}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
