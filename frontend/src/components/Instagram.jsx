import { InstagramLogo } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useLang } from "../context/LanguageContext";
import { STRINGS } from "../i18n";
import { Reveal } from "./Reveal";

export default function Instagram({ settings }) {
  const { t } = useLang();
  const grid = (settings.instagram_grid || []).slice(0, 9);
  const link = settings.instagram || null;

  const handle = (e) => {
    if (!link) { e.preventDefault(); toast.info(t(STRINGS.order.soon)); }
  };

  return (
    <section id="instagram" className="py-24 sm:py-32 px-5 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
            <h2 className="font-display text-5xl sm:text-7xl text-dot-cream">{t(STRINGS.instagram.title)}</h2>
            <a
              data-testid="instagram-link"
              href={link || "#"}
              onClick={handle}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-dot-cream text-xs tracking-[0.2em] uppercase hover:border-dot-gold hover:text-dot-gold transition-colors"
            >
              <InstagramLogo size={18} weight="light" /> {t(STRINGS.instagram.cta)}
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-3 gap-2 sm:gap-3" data-testid="instagram-grid">
          {grid.map((src, i) => (
            <motion.a
              key={i}
              data-testid={`instagram-img-${i}`}
              href={link || "#"} onClick={handle} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className="group relative aspect-square overflow-hidden rounded-lg sm:rounded-xl"
            >
              <img src={src} alt={`One Dot instagram ${i + 1}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-dot-bg/0 group-hover:bg-dot-bg/40 transition-colors flex items-center justify-center">
                <InstagramLogo size={28} weight="light" className="text-dot-cream opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
