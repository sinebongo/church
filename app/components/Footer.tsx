"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { useContent } from "@/app/context/ContentProvider";

export function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const orgName = useContent("footer.org_name", "ELCSA CDYL");
  const tagline = useContent("footer.tagline", "Central Diocese Prayer Youth League");
  const email = useContent("contact.email", "elcsa.cdpyl@gmail.com");
  const instagram = useContent("footer.social_instagram", "https://www.instagram.com/elcsacdyl/");
  const youtube = useContent("footer.social_youtube", "https://www.youtube.com/@ELCSACentralDioceseYouthLeague");

  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-navy text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
        <div>
          <p className="font-serif text-lg text-white mb-2">{orgName}</p>
          <p>{tagline}</p>
          <p>{email}</p>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/about" className="hover:text-gold transition-colors">About</Link>
          <Link href="/events" className="hover:text-gold transition-colors">Events</Link>
          <Link href="/leadership" className="hover:text-gold transition-colors">Leadership</Link>
          <Link href="/contact" className="hover:text-gold transition-colors">Contact</Link>
        </div>
        <div className="flex items-start gap-4">
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-gold transition-colors text-xl"
          >
            <FaInstagram />
          </a>
          <a
            href={youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="hover:text-gold transition-colors text-xl"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        &copy; {year} {orgName}. All rights reserved.
      </div>
    </footer>
  );
}
