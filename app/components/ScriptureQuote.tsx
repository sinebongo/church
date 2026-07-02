interface ScriptureQuoteProps {
  reference?: string;
  children: React.ReactNode;
  className?: string;
}

export function ScriptureQuote({ reference, children, className }: ScriptureQuoteProps) {
  return (
    <blockquote
      className={`border-l-4 border-gold pl-5 font-serif italic text-ink/80 leading-relaxed ${className ?? ""}`}
    >
      <p>{children}</p>
      {reference && (
        <cite className="block mt-2 text-sm not-italic tracking-wide text-navy font-medium">
          — {reference}
        </cite>
      )}
    </blockquote>
  );
}
