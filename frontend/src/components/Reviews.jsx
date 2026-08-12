import { motion } from "framer-motion";
import { Star } from "@phosphor-icons/react";
import { useLang } from "../context/LanguageContext";
import { STRINGS } from "../i18n";
import { Reveal } from "./Reveal";

function Stars({ rating }) {
  return (
    <div className="flex gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, type: "spring", stiffness: 300 }}
        >
          <Star size={16} weight={i < Math.round(rating) ? "fill" : "regular"} className="text-dot-gold" />
        </motion.span>
      ))}
    </div>
  );
}

export default function Reviews({ settings }) {
  const { t, pick } = useLang();
  const reviews = settings.reviews || [];

  return (
    <section id="reviews" className="py-24 sm:py-32 px-5 sm:px-10 bg-dot-surface">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.35em] uppercase text-dot-gold mb-4">{t(STRINGS.reviews.kicker)}</p>
          <div className="flex flex-wrap items-end gap-6">
            <h2 className="font-display text-5xl sm:text-7xl text-dot-cream">{t(STRINGS.reviews.title)}</h2>
            <div className="flex items-center gap-3 pb-2">
              <motion.span
                animate={{ scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 2.4 }}
              >
                <Star size={26} weight="fill" className="text-dot-gold" />
              </motion.span>
              <span className="font-display text-4xl text-dot-cream">{settings.rating}</span>
              <span className="text-dot-muted text-sm">/ {settings.reviews_count} {t(STRINGS.hero.reviews)}</span>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div data-testid={`review-${i}`} className="h-full bg-dot-card border border-white/5 rounded-2xl p-7">
                <Stars rating={r.rating} />
                <p className="mt-5 text-dot-cream/90 leading-relaxed">"{pick(r.text_en, r.text_ar)}"</p>
                <p className="mt-6 text-sm tracking-[0.15em] uppercase text-dot-gold">{pick(r.name_en, r.name_ar)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
