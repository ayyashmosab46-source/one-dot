import { MapPin, Clock, NavigationArrow, MapTrifold, Chair, Coffee } from "@phosphor-icons/react";
import { useLang } from "../context/LanguageContext";
import { STRINGS } from "../i18n";
import { Reveal } from "./Reveal";

export default function LocationSection({ settings }) {
  const { t, pick } = useLang();
  const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(settings.plus_code + " Mecca")}&z=15&output=embed`;

  return (
    <section id="location" className="py-24 sm:py-32 px-5 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.35em] uppercase text-dot-gold mb-4">{t(STRINGS.location.kicker)}</p>
          <h2 className="font-display text-5xl sm:text-7xl text-dot-cream mb-12">{t(STRINGS.location.title)}</h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Reveal className="lg:col-span-2">
            <div className="relative h-[420px] rounded-2xl overflow-hidden border border-white/10" data-testid="map">
              <iframe
                title="One Dot Location"
                src={mapEmbed}
                className="h-full w-full grayscale-[0.3] contrast-110"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg)" }}
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="h-full flex flex-col gap-4">
              <div className="bg-dot-card border border-white/5 rounded-2xl p-6">
                <MapPin size={26} weight="light" className="text-dot-gold" />
                <p className="font-display text-2xl text-dot-cream mt-3">One Dot · ون دوت</p>
                <p className="text-dot-gray mt-1">{pick(settings.address_en, settings.address_ar)}</p>
                <p className="text-sm text-dot-muted mt-3">{t(STRINGS.location.plusCode)}: <span className="text-dot-cream">{settings.plus_code}</span></p>
                <div className="flex gap-3 mt-5">
                  <a data-testid="btn-google-maps" href={settings.maps_url} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-dot-gold text-black text-xs tracking-[0.15em] uppercase font-medium hover:bg-dot-goldMuted transition-colors">
                    <MapTrifold size={16} /> {t(STRINGS.location.googleMaps)}
                  </a>
                  <a data-testid="btn-directions" href={settings.directions_url} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full border border-white/20 text-dot-cream text-xs tracking-[0.15em] uppercase hover:bg-white/10 transition-colors">
                    <NavigationArrow size={16} /> {t(STRINGS.location.directions)}
                  </a>
                </div>
              </div>

              <div className="bg-dot-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-2 text-dot-gold"><Clock size={20} weight="light" /><span className="text-xs tracking-[0.25em] uppercase">{t(STRINGS.location.hours)}</span></div>
                <div className="mt-4 space-y-2 text-sm">
                  <p className="text-dot-cream">{pick(settings.hours_weekday_en, settings.hours_weekday_ar)}</p>
                  <p className="text-dot-cream">{pick(settings.hours_friday_en, settings.hours_friday_ar)}</p>
                </div>
                <div className="flex gap-2 mt-5">
                  <span className="inline-flex items-center gap-1.5 text-xs text-dot-gray px-3 py-1.5 rounded-full border border-white/10"><Chair size={14} /> {t(STRINGS.location.dineIn)}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-dot-gray px-3 py-1.5 rounded-full border border-white/10"><Coffee size={14} /> {t(STRINGS.location.takeaway)}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
