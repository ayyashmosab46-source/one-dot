import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star, ArrowDown } from "@phosphor-icons/react";
import { useLang } from "../context/LanguageContext";
import { STRINGS } from "../i18n";
import { RevealLines } from "./Reveal";

const HERO_IMG = "https://images.unsplash.com/photo-1549035975-7ca0d2ce5033?auto=format&fit=crop&w=1600&q=85";

export default function Hero({ settings, onOrder }) {
  const { t, isAr } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={HERO_IMG} alt="One Dot" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-dot-bg/70 via-dot-bg/40 to-dot-bg" />
        <div className="absolute inset-0 bg-dot-bg/30" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col justify-center px-5 sm:px-10 max-w-7xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}
          className="text-xs sm:text-sm tracking-[0.4em] uppercase text-dot-gold mb-6"
        >
          One Dot · ون دوت
        </motion.span>

        <h1 className={`${isAr ? "font-arhead" : "font-display"} text-6xl sm:text-8xl lg:text-9xl font-medium leading-[0.9] text-dot-cream`}>
          <RevealLines lines={["ONE DOT"]} delay={0.4} />
        </h1>

        <div className={`mt-5 ${isAr ? "font-arhead" : "font-display"} text-xl sm:text-3xl text-dot-gold tracking-wide`}>
          <RevealLines lines={[t(STRINGS.hero.tagline)]} delay={0.7} />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.9 }}
          className="mt-6 max-w-md text-base sm:text-lg text-dot-gray leading-relaxed"
        >
          {t(STRINGS.hero.sub)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.9 }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <button
            data-testid="hero-explore-menu"
            onClick={() => scrollTo("menu")}
            className="px-7 py-3.5 rounded-full bg-dot-gold text-black text-sm tracking-[0.2em] uppercase font-medium hover:bg-dot-goldMuted transition-colors"
          >
            {t(STRINGS.hero.exploreMenu)}
          </button>
          <button
            data-testid="hero-location"
            onClick={() => scrollTo("location")}
            className="px-7 py-3.5 rounded-full border border-white/25 text-dot-cream text-sm tracking-[0.2em] uppercase hover:bg-white/10 transition-colors"
          >
            {t(STRINGS.hero.location)}
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom stats */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-0 inset-x-0 z-10 border-t border-white/10 bg-dot-bg/40 backdrop-blur-md"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-10 py-5 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3" data-testid="hero-rating">
            <Star size={20} weight="fill" className="text-dot-gold" />
            <span className="font-display text-2xl text-dot-cream">{settings.rating}</span>
            <span className="text-xs text-dot-muted tracking-wide">{settings.reviews_count}+ {t(STRINGS.hero.reviews)}</span>
          </div>
          <div className="text-right rtl:text-left" data-testid="hero-price">
            <span className="font-display text-2xl text-dot-cream">{settings.price_min}–{settings.price_max}</span>
            <span className="text-dot-gold text-sm"> {isAr ? "ر.س" : "SAR"}</span>
            <p className="text-xs text-dot-muted tracking-wide">{t(STRINGS.hero.avgPrice)}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 text-dot-gold/70"
      >
        <ArrowDown size={22} weight="light" />
      </motion.div>
    </section>
  );
}
