export default function Marquee() {
  const words = ["ESPRESSO", "MATCHA", "COLD BREW", "SIGNATURE", "DESSERTS", "MECCA"];
  const items = [...words, ...words];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-dot-surface py-6 select-none" data-testid="marquee">
      <div className="flex whitespace-nowrap animate-marquee">
        {items.map((w, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-8 font-display text-3xl sm:text-5xl text-dot-cream/90">
            {w}
            <span className="h-2 w-2 rounded-full bg-dot-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
