import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { STRINGS } from "../i18n";

export default function Footer({ settings }) {
  const { t, pick } = useLang();
  return (
    <footer className="border-t border-white/10 bg-dot-bg pb-24 md:pb-10 pt-14 px-5 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-dot-gold" />
              <span className="font-display text-2xl tracking-[0.3em] text-dot-cream">ONE DOT</span>
            </div>
            <p className="mt-3 text-dot-gray max-w-xs">{t(STRINGS.footer.tagline)}</p>
          </div>
          <div className="text-sm text-dot-gray space-y-1 sm:text-right rtl:sm:text-left">
            <p>{pick(settings.address_en, settings.address_ar)}</p>
            <p>{t(STRINGS.location.plusCode)}: {settings.plus_code}</p>
            <p>{pick(settings.hours_weekday_en, settings.hours_weekday_ar)}</p>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-dot-muted">
          <p>© {new Date().getFullYear()} One Dot. {t(STRINGS.footer.rights)}</p>
          <Link data-testid="admin-login-link" to="/login" className="hover:text-dot-gold transition-colors tracking-[0.2em] uppercase">{t(STRINGS.footer.adminLogin)}</Link>
        </div>
      </div>
    </footer>
  );
}
