import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import { useLang } from "../context/LanguageContext";
import { STRINGS } from "../i18n";

const LINKS = [
  ["home", "hero"],
  ["menu", "menu"],
  ["about", "signature"],
  ["gallery", "experience"],
  ["location", "location"],
];

export default function Navbar({ onOrder }) {
  const { t, lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        data-testid="navbar"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed top-0 inset-x-0 z-[60] transition-colors duration-500 ${
          scrolled ? "bg-dot-bg/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          <button data-testid="nav-logo" onClick={() => go("hero")} className="flex items-center gap-2 group">
            <span className="h-2 w-2 rounded-full bg-dot-gold group-hover:scale-125 transition-transform" />
            <span className="font-display text-lg sm:text-xl tracking-[0.3em] text-dot-cream">ONE DOT</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {LINKS.map(([key, id]) => (
              <button
                key={key}
                data-testid={`nav-${key}`}
                onClick={() => go(id)}
                className="text-xs tracking-[0.2em] uppercase text-dot-gray hover:text-dot-cream transition-colors"
              >
                {t(STRINGS.nav[key])}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              data-testid="lang-toggle"
              onClick={toggle}
              className="text-xs tracking-[0.15em] px-3 py-1.5 rounded-full border border-white/15 text-dot-cream hover:border-dot-gold hover:text-dot-gold transition-colors"
            >
              {lang === "en" ? "عربي" : "EN"}
            </button>
            <button
              data-testid="nav-order"
              onClick={onOrder}
              className="hidden sm:inline-flex text-xs tracking-[0.2em] uppercase px-5 py-2.5 rounded-full bg-dot-gold text-black font-medium hover:bg-dot-goldMuted transition-colors"
            >
              {t(STRINGS.nav.order)}
            </button>
            <button
              data-testid="mobile-menu-btn"
              onClick={() => setOpen(true)}
              className="md:hidden text-dot-cream"
              aria-label="Menu"
            >
              <List size={26} weight="light" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            className="fixed inset-0 z-[70] bg-dot-bg/95 backdrop-blur-2xl flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex justify-end p-6">
              <button data-testid="mobile-menu-close" onClick={() => setOpen(false)} className="text-dot-cream">
                <X size={28} weight="light" />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {LINKS.map(([key, id], i) => (
                <motion.button
                  key={key}
                  data-testid={`mobile-nav-${key}`}
                  onClick={() => go(id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="font-display text-3xl text-dot-cream"
                >
                  {t(STRINGS.nav[key])}
                </motion.button>
              ))}
              <button
                data-testid="mobile-nav-order"
                onClick={() => { setOpen(false); onOrder(); }}
                className="mt-4 px-8 py-3 rounded-full bg-dot-gold text-black tracking-[0.2em] uppercase text-sm"
              >
                {t(STRINGS.nav.order)}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
