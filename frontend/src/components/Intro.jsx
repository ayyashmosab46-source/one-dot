import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import { STRINGS } from "../i18n";

export default function Intro({ onDone }) {
  const { t, isAr } = useLang();
  const [stage, setStage] = useState(0); // 0 dot, 1 logo, 2 moment, 3 out

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 900),
      setTimeout(() => setStage(2), 2000),
      setTimeout(() => setStage(3), 3300),
      setTimeout(() => onDone(), 4100),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <AnimatePresence>
      {stage < 3 && (
        <motion.div
          data-testid="intro-overlay"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-dot-bg"
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
        >
          <motion.div
            className="rounded-full bg-dot-gold"
            initial={{ width: 14, height: 14, opacity: 0 }}
            animate={
              stage === 0
                ? { width: 14, height: 14, opacity: 1, scale: [1, 1.25, 1] }
                : { width: 10, height: 10, opacity: 1, scale: 1 }
            }
            transition={{ duration: stage === 0 ? 0.9 : 0.6, ease: "easeInOut", repeat: stage === 0 ? Infinity : 0 }}
          />

          <AnimatePresence>
            {stage >= 1 && (
              <motion.h1
                key="logo"
                className={`mt-6 ${isAr ? "font-arhead" : "font-display"} text-4xl sm:text-6xl tracking-[0.25em] text-dot-cream`}
                initial={{ opacity: 0, letterSpacing: "0.6em", y: 10 }}
                animate={{ opacity: 1, letterSpacing: "0.25em", y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                ONE DOT
              </motion.h1>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {stage >= 2 && (
              <motion.p
                key="moment"
                className="mt-4 text-sm sm:text-base tracking-[0.35em] uppercase text-dot-gold"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {t(STRINGS.intro.moment)}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
