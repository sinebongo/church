import React from "react";

interface DownloadButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function DownloadButton({ href, children, className = "" }: DownloadButtonProps) {
  return (
    <a
      href={href}
      download
      className={
        "bg-gold text-navy px-8 py-3 rounded-lg font-semibold hover:bg-gold/90 transition-colors w-full max-w-xs flex items-center justify-center " +
        className
      }
    >
      {children}
    </a>
  );
}