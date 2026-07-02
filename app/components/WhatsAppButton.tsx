"use client";

import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { useContent } from "@/app/context/ContentProvider";

export function WhatsAppButton() {
  const pathname = usePathname();
  const whatsapp = useContent("footer.social_whatsapp", "");

  if (pathname?.startsWith("/admin") || !whatsapp) return null;

  return (
    <a
      href={whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join our WhatsApp channel"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white text-2xl shadow-lg hover:scale-110 transition-transform"
    >
      <FaWhatsapp />
    </a>
  );
}
