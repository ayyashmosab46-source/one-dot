import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { api, formatApiErrorDetail } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { Plus, PencilSimple, Trash, SignOut, ForkKnife, Gear, X } from "@phosphor-icons/react";

const CATEGORIES = ["Signature Drinks", "Hot Coffee", "Cold Coffee", "Matcha", "Non-Coffee", "Desserts", "Breakfast"];

const EMPTY = {
  name_en: "", name_ar: "", desc_en: "", desc_ar: "", ingredients_en: "", ingredients_ar: "",
  price: 0, category: "Hot Coffee", image: "", options: [], addons: [],
  is_signature: false, signature_no: "", order: 0, available: true,
};

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.15em] uppercase text-dot-gray">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

const inputCls = "w-full bg-dot-bg border border-white/10 rounded-lg px-3 py-2.5 text-dot-cream text-sm focus:border-dot-gold outline-none";

export default function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("menu");
  const [items, setItems] = useState([]);
  const [settings, setSettings] = useState(null);
  const [editing, setEditing] = useState(null); // product being edited/created
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => { if (user === false) navigate("/login"); }, [user, navigate]);

  const load = useCallback(() => {
    api.get("/menu").then((r) => setItems(r.data)).catch(() => {});
    api.get("/settings").then((r) => setSettings(r.data)).catch(() => {});
  }, []);
  useEffect(() => { load(); }, [load]);

  const saveProduct = async () => {
    const { id, ...payload } = editing;
    payload.price = Number(payload.price) || 0;
    payload.order = Number(payload.order) || 0;
    try {
      if (id) await api.put(`/admin/menu/${id}`, payload);
      else await api.post("/admin/menu", payload);
      toast.success("Saved");
      setEditing(null);
      load();
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || "Save failed");
    }
  };

  const del = async (item) => {
    if (!window.confirm(`Delete "${item.name_en}"?`)) return;
    try { await api.delete(`/admin/menu/${item.id}`); toast.success("Deleted"); load(); }
    catch { toast.error("Delete failed"); }
  };

  const saveSettings = async () => {
    setSavingSettings(true);
    try {
      const payload = {
        ...settings,
        rating: Number(settings.rating) || 0,
        reviews_count: Number(settings.reviews_count) || 0,
        price_min: Number(settings.price_min) || 0,
        price_max: Number(settings.price_max) || 0,
      };
      await api.put("/admin/settings", payload);
      toast.success("Settings saved");
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || "Save failed");
    } finally { setSavingSettings(false); }
  };

  const setS = (k, v) => setSettings((s) => ({ ...s, [k]: v }));

  if (!user || !settings) return <div className="min-h-screen bg-dot-bg flex items-center justify-center text-dot-gold">·</div>;

  return (
    <div className="min-h-screen bg-dot-bg text-dot-cream">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-dot-bg/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-dot-gold" />
            <span className="font-display tracking-[0.3em]">ONE DOT</span>
            <span className="text-dot-muted text-xs ml-2">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="text-xs text-dot-gray hover:text-dot-cream tracking-widest uppercase">View site</button>
            <button data-testid="admin-logout" onClick={async () => { await logout(); navigate("/login"); }} className="inline-flex items-center gap-1.5 text-xs text-dot-gray hover:text-dot-gold tracking-widest uppercase">
              <SignOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button data-testid="tab-menu" onClick={() => setTab("menu")} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-[0.15em] uppercase border ${tab === "menu" ? "bg-dot-gold text-black border-dot-gold" : "border-white/15 text-dot-gray"}`}>
            <ForkKnife size={15} /> Menu
          </button>
          <button data-testid="tab-settings" onClick={() => setTab("settings")} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-[0.15em] uppercase border ${tab === "settings" ? "bg-dot-gold text-black border-dot-gold" : "border-white/15 text-dot-gray"}`}>
            <Gear size={15} /> Settings
          </button>
        </div>

        {tab === "menu" && (
          <div>
            <div className="flex justify-between items-center mb-5">
              <h1 className="font-display text-3xl">Menu ({items.length})</h1>
              <button data-testid="add-product" onClick={() => setEditing({ ...EMPTY })} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-dot-gold text-black text-xs tracking-[0.15em] uppercase font-medium">
                <Plus size={16} weight="bold" /> Add Product
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((it) => (
                <div key={it.id} data-testid={`admin-item-${it.id}`} className="bg-dot-card border border-white/5 rounded-xl overflow-hidden">
                  <div className="h-32 overflow-hidden"><img src={it.image} alt={it.name_en} className="h-full w-full object-cover" /></div>
                  <div className="p-4">
                    <div className="flex justify-between gap-2">
                      <p className="font-medium">{it.name_en}</p>
                      <span className="text-dot-gold text-sm">{it.price}</span>
                    </div>
                    <p className="text-xs text-dot-muted mt-1">{it.category}{it.is_signature ? " · Signature" : ""}{it.available ? "" : " · Hidden"}</p>
                    <div className="flex gap-2 mt-3">
                      <button data-testid={`edit-${it.id}`} onClick={() => setEditing(it)} className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/10 text-xs hover:border-dot-gold"><PencilSimple size={14} /> Edit</button>
                      <button data-testid={`delete-${it.id}`} onClick={() => del(it)} className="px-3 py-2 rounded-lg border border-white/10 text-xs text-red-400 hover:border-red-400"><Trash size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "settings" && (
          <div className="max-w-3xl">
            <h1 className="font-display text-3xl mb-6">Settings</h1>
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <Field label="WhatsApp number (with country code)"><input data-testid="set-whatsapp" className={inputCls} value={settings.whatsapp} onChange={(e) => setS("whatsapp", e.target.value)} placeholder="9665XXXXXXXX" /></Field>
                <Field label="Instagram URL"><input data-testid="set-instagram" className={inputCls} value={settings.instagram} onChange={(e) => setS("instagram", e.target.value)} placeholder="https://instagram.com/..." /></Field>
                <Field label="Rating"><input className={inputCls} value={settings.rating} onChange={(e) => setS("rating", e.target.value)} /></Field>
                <Field label="Reviews count"><input className={inputCls} value={settings.reviews_count} onChange={(e) => setS("reviews_count", e.target.value)} /></Field>
                <Field label="Price min"><input className={inputCls} value={settings.price_min} onChange={(e) => setS("price_min", e.target.value)} /></Field>
                <Field label="Price max"><input className={inputCls} value={settings.price_max} onChange={(e) => setS("price_max", e.target.value)} /></Field>
                <Field label="Address (EN)"><input className={inputCls} value={settings.address_en} onChange={(e) => setS("address_en", e.target.value)} /></Field>
                <Field label="Address (AR)"><input className={inputCls} dir="rtl" value={settings.address_ar} onChange={(e) => setS("address_ar", e.target.value)} /></Field>
                <Field label="Plus Code"><input className={inputCls} value={settings.plus_code} onChange={(e) => setS("plus_code", e.target.value)} /></Field>
                <Field label="Google Maps URL"><input className={inputCls} value={settings.maps_url} onChange={(e) => setS("maps_url", e.target.value)} /></Field>
                <Field label="Hours weekday (EN)"><input className={inputCls} value={settings.hours_weekday_en} onChange={(e) => setS("hours_weekday_en", e.target.value)} /></Field>
                <Field label="Hours weekday (AR)"><input className={inputCls} dir="rtl" value={settings.hours_weekday_ar} onChange={(e) => setS("hours_weekday_ar", e.target.value)} /></Field>
                <Field label="Hours Friday (EN)"><input className={inputCls} value={settings.hours_friday_en} onChange={(e) => setS("hours_friday_en", e.target.value)} /></Field>
                <Field label="Hours Friday (AR)"><input className={inputCls} dir="rtl" value={settings.hours_friday_ar} onChange={(e) => setS("hours_friday_ar", e.target.value)} /></Field>
              </div>
              <Field label="Gallery image URLs (one per line)">
                <textarea className={`${inputCls} h-28 font-mono text-xs`} value={(settings.gallery || []).join("\n")} onChange={(e) => setS("gallery", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))} />
              </Field>
              <Field label="Instagram grid URLs (one per line)">
                <textarea className={`${inputCls} h-28 font-mono text-xs`} value={(settings.instagram_grid || []).join("\n")} onChange={(e) => setS("instagram_grid", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))} />
              </Field>
              <button data-testid="save-settings" onClick={saveSettings} disabled={savingSettings} className="px-6 py-3 rounded-full bg-dot-gold text-black text-xs tracking-[0.2em] uppercase font-medium disabled:opacity-60">
                {savingSettings ? "Saving…" : "Save Settings"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Product editor */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-start justify-center overflow-y-auto p-4">
          <div data-testid="product-editor" className="bg-dot-card border border-white/10 rounded-2xl w-full max-w-2xl my-8 p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-display text-2xl">{editing.id ? "Edit Product" : "New Product"}</h2>
              <button onClick={() => setEditing(null)} className="text-dot-gray hover:text-dot-cream"><X size={22} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Name (EN)"><input data-testid="edit-name-en" className={inputCls} value={editing.name_en} onChange={(e) => setEditing({ ...editing, name_en: e.target.value })} /></Field>
              <Field label="Name (AR)"><input className={inputCls} dir="rtl" value={editing.name_ar} onChange={(e) => setEditing({ ...editing, name_ar: e.target.value })} /></Field>
              <Field label="Category">
                <select data-testid="edit-category" className={inputCls} value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c} value={c} className="bg-dot-bg">{c}</option>)}
                </select>
              </Field>
              <Field label="Price (SAR)"><input data-testid="edit-price" type="number" className={inputCls} value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} /></Field>
              <div className="col-span-2"><Field label="Image URL"><input data-testid="edit-image" className={inputCls} value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} /></Field></div>
              <div className="col-span-2"><Field label="Description (EN)"><textarea className={`${inputCls} h-20`} value={editing.desc_en} onChange={(e) => setEditing({ ...editing, desc_en: e.target.value })} /></Field></div>
              <div className="col-span-2"><Field label="Description (AR)"><textarea className={`${inputCls} h-20`} dir="rtl" value={editing.desc_ar} onChange={(e) => setEditing({ ...editing, desc_ar: e.target.value })} /></Field></div>
              <Field label="Ingredients (EN)"><input className={inputCls} value={editing.ingredients_en} onChange={(e) => setEditing({ ...editing, ingredients_en: e.target.value })} /></Field>
              <Field label="Ingredients (AR)"><input className={inputCls} dir="rtl" value={editing.ingredients_ar} onChange={(e) => setEditing({ ...editing, ingredients_ar: e.target.value })} /></Field>
              <Field label="Signature No (e.g. 01)"><input className={inputCls} value={editing.signature_no} onChange={(e) => setEditing({ ...editing, signature_no: e.target.value })} /></Field>
              <Field label="Sort order"><input type="number" className={inputCls} value={editing.order} onChange={(e) => setEditing({ ...editing, order: e.target.value })} /></Field>
            </div>
            <div className="flex gap-6 mt-4">
              <label className="flex items-center gap-2 text-sm text-dot-gray"><input type="checkbox" checked={editing.is_signature} onChange={(e) => setEditing({ ...editing, is_signature: e.target.checked })} /> Signature</label>
              <label className="flex items-center gap-2 text-sm text-dot-gray"><input type="checkbox" checked={editing.available} onChange={(e) => setEditing({ ...editing, available: e.target.checked })} /> Available</label>
            </div>
            <div className="flex gap-3 mt-6">
              <button data-testid="save-product" onClick={saveProduct} className="px-6 py-3 rounded-full bg-dot-gold text-black text-xs tracking-[0.2em] uppercase font-medium">Save</button>
              <button onClick={() => setEditing(null)} className="px-6 py-3 rounded-full border border-white/15 text-xs tracking-[0.2em] uppercase text-dot-gray">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
