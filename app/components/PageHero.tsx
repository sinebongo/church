import { Background3D } from "./Background3D";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-dark text-white py-20 px-4">
      <Background3D variant="spheres" />
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-dark" />
      <div className="relative max-w-5xl mx-auto text-center">
        {eyebrow && (
          <p className="uppercase tracking-widest text-gold text-sm font-medium mb-3">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-4xl md:text-5xl font-bold">{title}</h1>
        {subtitle && (
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
