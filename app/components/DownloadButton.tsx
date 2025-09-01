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
        "bg-[#e1c575] text-[#2f3a82] px-8 py-3 rounded-lg font-semibold hover:bg-[#e1c575]/90 transition-colors w-full max-w-xs flex items-center justify-center " +
        className
      }
    >
      {children}
    </a>
  );
}