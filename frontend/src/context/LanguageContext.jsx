import { createContext, useContext, useState, useEffect, useCallback } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("onedot_lang") || "en");

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("onedot_lang", lang);
  }, [lang]);

  const toggle = useCallback(() => setLang((l) => (l === "en" ? "ar" : "en")), []);

  // t: pass a bilingual object {en, ar} OR fetched item field pair
  const t = useCallback((obj) => (obj ? obj[lang] ?? obj.en ?? "" : ""), [lang]);
  const pick = useCallback((en, ar) => (lang === "ar" ? ar || en : en), [lang]);

  const dir = lang === "ar" ? "rtl" : "ltr";
  const isAr = lang === "ar";

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t, pick, dir, isAr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
