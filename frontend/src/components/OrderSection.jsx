import { WhatsappLogo } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import { STRINGS } from "../i18n";
import { Reveal } from "./Reveal";

export default function OrderSection({ onOrder }) {
  const { t } = useLang();
  return (
    <section id="order" className="py-24 sm:py-32 px-5 sm:px-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-surface" />
      <div className="relative max-w-4xl mx-auto text-center">
        <Reveal>
          <p className="text-xs tracking-[0.35em] uppercase text-dot-gold mb-4">{t(STRINGS.order.kicker)}</p>
          <h2 className="font-display text-5xl sm:text-7xl text-dot-cream">{t(STRINGS.order.title)}</h2>
          <p className="mt-5 max-w-xl mx-auto text-dot-gray leading-relaxed">{t(STRINGS.order.desc)}</p>
          <motion.button
            data-testid="order-cta"
            onClick={onOrder}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="mt-9 inline-flex items-center gap-3 px-9 py-4 rounded-full bg-dot-gold text-black tracking-[0.2em] uppercase text-sm font-medium"
          >
            <WhatsappLogo size={22} weight="fill" /> {t(STRINGS.order.cta)}
          </motion.button>
        </Reveal>
      </div>
    </section>
  );
}
