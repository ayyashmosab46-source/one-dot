import { useLang } from "../context/LanguageContext";
import { STRINGS } from "../i18n";
import { Reveal } from "./Reveal";

export default function Experience({ settings }) {
  const { t } = useLang();
  const images = settings.gallery || [];

  return (
    <section id="experience" className="py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        <Reveal>
          <p className="text-xs tracking-[0.35em] uppercase text-dot-gold mb-4">{t(STRINGS.experience.kicker)}</p>
          <h2 className="font-display text-5xl sm:text-7xl text-dot-cream">{t(STRINGS.experience.title)}</h2>
          <p className="mt-4 max-w-lg text-dot-gray leading-relaxed">{t(STRINGS.experience.desc)}</p>
        </Reveal>
      </div>

      <div className="mt-14 flex gap-5 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-5 sm:px-10 pb-4" data-testid="gallery">
        {images.map((src, i) => (
          <div
            key={i}
            data-testid={`gallery-img-${i}`}
            className="group relative shrink-0 snap-center w-[75vw] sm:w-[38vw] lg:w-[28vw] h-[60vh] overflow-hidden rounded-2xl border border-white/5"
          >
            <img src={src} alt={`One Dot ${i + 1}`} className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-dot-bg/60 to-transparent" />
            <span className="absolute bottom-4 left-4 font-display text-white/40 text-2xl">{String(i + 1).padStart(2, "0")}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
