import { toast } from "sonner";

// Build a wa.me link; returns null if no number configured.
export function buildWhatsappLink(number, message) {
  if (!number) return null;
  const clean = String(number).replace(/[^\d]/g, "");
  if (!clean) return null;
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

export function openOrder(settings, message, soonText) {
  const link = buildWhatsappLink(settings?.whatsapp, message || "Hello One Dot! I'd like to place an order.");
  if (!link) {
    toast.info(soonText || "Ordering link coming soon");
    return;
  }
  window.open(link, "_blank", "noopener");
}
