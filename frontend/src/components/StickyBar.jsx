import { motion } from "framer-motion";
import { ForkKnife, MapPin, WhatsappLogo } from "@phosphor-icons/react";
import { useLang } from "../context/LanguageContext";
import { STRINGS } from "../i18n";

export default function StickyBar({ onOrder }) {
  const { t } = useLang();
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const Item = ({ testid, icon, label, onClick }) => (
    <button data-testid={testid} onClick={onClick} className="flex-1 flex flex-col items-center gap-1 py-3 text-dot-cream active:text-dot-gold transition-colors">
      {icon}
      <span className="text-[10px] tracking-[0.15em] uppercase">{label}</span>
    </button>
  );

  return (
    <motion.div
      data-testid="sticky-bar"
      initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: 1 }}
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-dot-bg/85 backdrop-blur-xl border-t border-white/10"
    >
      <div className="flex items-stretch divide-x divide-white/10 rtl:divide-x-reverse">
        <Item testid="sticky-menu" icon={<ForkKnife size={22} weight="light" />} label={t(STRINGS.sticky.menu)} onClick={() => go("menu")} />
        <Item testid="sticky-location" icon={<MapPin size={22} weight="light" />} label={t(STRINGS.sticky.location)} onClick={() => go("location")} />
        <Item testid="sticky-order" icon={<WhatsappLogo size={22} weight="light" className="text-dot-gold" />} label={t(STRINGS.sticky.order)} onClick={onOrder} />
      </div>
    </motion.div>
  );
}
