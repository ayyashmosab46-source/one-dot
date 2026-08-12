import { Dialog, DialogContent } from "./ui/dialog";
import { X } from "@phosphor-icons/react";
import { useLang } from "../context/LanguageContext";
import { STRINGS } from "../i18n";
import { openOrder } from "../lib/order";

export default function ProductModal({ item, onClose, settings }) {
  const { t, lang, pick } = useLang();
  if (!item) return null;

  const sar = lang === "ar" ? "ر.س" : "SAR";
  const order = () => {
    const name = pick(item.name_en, item.name_ar);
    openOrder(settings, `One Dot — ${name} (${item.price} ${sar})`, t(STRINGS.order.soon));
  };

  return (
    <Dialog open={!!item} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        data-testid="product-modal"
        className="max-w-3xl p-0 overflow-hidden bg-dot-card border border-white/10 text-dot-cream max-h-[90vh] overflow-y-auto hide-scrollbar"
      >
        <button data-testid="product-modal-close" onClick={onClose} className="absolute top-4 right-4 z-10 h-9 w-9 rounded-full bg-black/50 flex items-center justify-center text-dot-cream hover:bg-black/80">
          <X size={18} weight="bold" />
        </button>

        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img src={item.image} alt={pick(item.name_en, item.name_ar)} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dot-card to-transparent" />
        </div>

        <div className="p-6 sm:p-8 -mt-8 relative">
          <div className="flex items-start justify-between gap-4">
            <div>
              {item.signature_no && <span className="text-xs tracking-[0.3em] text-dot-gold">SIGNATURE {item.signature_no}</span>}
              <h3 className="font-display text-3xl sm:text-4xl mt-1">{pick(item.name_en, item.name_ar)}</h3>
            </div>
            <span className="font-display text-2xl text-dot-gold shrink-0">{item.price} <span className="text-sm">{sar}</span></span>
          </div>

          <p className="mt-4 text-dot-gray leading-relaxed">{pick(item.desc_en, item.desc_ar)}</p>

          {item.calories && (
            <p className="mt-3 text-xs tracking-[0.15em] uppercase text-dot-muted">{item.calories} {lang === "ar" ? "سعرة حرارية" : "Calories"}</p>
          )}

          {pick(item.ingredients_en, item.ingredients_ar) && (
            <div className="mt-6">
              <p className="text-xs tracking-[0.25em] uppercase text-dot-gold mb-2">{t(STRINGS.menu.ingredients)}</p>
              <p className="text-sm text-dot-gray">{pick(item.ingredients_en, item.ingredients_ar)}</p>
            </div>
          )}

          {item.options?.length > 0 && (
            <div className="mt-6">
              <p className="text-xs tracking-[0.25em] uppercase text-dot-gold mb-3">{t(STRINGS.menu.options)}</p>
              <div className="flex flex-wrap gap-2">
                {item.options.map((o, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full border border-white/10 text-sm text-dot-cream/90">
                    {pick(o.label_en, o.label_ar)}{o.price_delta ? ` +${o.price_delta}` : ""}
                  </span>
                ))}
              </div>
            </div>
          )}

          {item.addons?.length > 0 && (
            <div className="mt-6">
              <p className="text-xs tracking-[0.25em] uppercase text-dot-gold mb-3">{t(STRINGS.menu.addons)}</p>
              <div className="flex flex-wrap gap-2">
                {item.addons.map((o, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full border border-white/10 text-sm text-dot-cream/90">
                    {pick(o.label_en, o.label_ar)}{o.price_delta ? ` +${o.price_delta}` : ""}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            data-testid="product-modal-order"
            onClick={order}
            className="mt-8 w-full py-3.5 rounded-full bg-dot-gold text-black text-sm tracking-[0.2em] uppercase font-medium hover:bg-dot-goldMuted transition-colors"
          >
            {t(STRINGS.menu.orderThis)}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
