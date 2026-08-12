import { useState, useEffect, useCallback } from "react";
import Lenis from "lenis";
import { api } from "../lib/api";
import { openOrder } from "../lib/order";
import { useLang } from "../context/LanguageContext";
import { STRINGS } from "../i18n";
import Intro from "../components/Intro";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import MenuSection from "../components/MenuSection";
import Signature from "../components/Signature";
import Experience from "../components/Experience";
import Reviews from "../components/Reviews";
import LocationSection from "../components/LocationSection";
import OrderSection from "../components/OrderSection";
import Instagram from "../components/Instagram";
import Footer from "../components/Footer";
import StickyBar from "../components/StickyBar";
import ProductModal from "../components/ProductModal";

export default function Landing() {
  const { t } = useLang();
  const [intro, setIntro] = useState(() => !sessionStorage.getItem("onedot_intro"));
  const [menu, setMenu] = useState([]);
  const [settings, setSettings] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.get("/menu").then((r) => setMenu(r.data)).catch(() => {});
    api.get("/settings").then((r) => setSettings(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf;
    const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  const finishIntro = useCallback(() => {
    sessionStorage.setItem("onedot_intro", "1");
    setIntro(false);
  }, []);

  const handleOrder = useCallback(() => {
    openOrder(settings, "Hello One Dot! I'd like to place an order.", t(STRINGS.order.soon));
  }, [settings, t]);

  if (!settings) {
    return <div className="min-h-screen flex items-center justify-center bg-dot-bg text-dot-gold">·</div>;
  }

  return (
    <div className="bg-dot-bg min-h-screen">
      {intro && <Intro onDone={finishIntro} />}
      <Navbar onOrder={handleOrder} />
      <main>
        <Hero settings={settings} onOrder={handleOrder} />
        <Marquee />
        <MenuSection items={menu} onSelect={setSelected} />
        <Signature items={menu} onSelect={setSelected} />
        <Experience settings={settings} />
        <Reviews settings={settings} />
        <LocationSection settings={settings} />
        <OrderSection onOrder={handleOrder} />
        <Instagram settings={settings} />
      </main>
      <Footer settings={settings} />
      <StickyBar onOrder={handleOrder} />
      <ProductModal item={selected} onClose={() => setSelected(null)} settings={settings} />
    </div>
  );
}
