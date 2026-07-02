"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOutAdmin } from "@/app/admin/actions";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/members", label: "Members" },
  { href: "/admin/leadership", label: "Leadership" },
  { href: "/admin/word-of-month", label: "Word of the Month" },
  { href: "/admin/content", label: "Site Content" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-56 shrink-0 bg-navy text-white md:min-h-screen flex flex-col">
      <div className="p-6 font-serif text-lg font-bold border-b border-white/10">ELCSA CDYL Admin</div>
      <nav className="flex-1 flex flex-col gap-1 p-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "px-3 py-2 rounded-md text-sm transition-colors",
              pathname === link.href ? "bg-gold text-navy font-semibold" : "hover:bg-white/10"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <form action={signOutAdmin} className="p-4 border-t border-white/10">
        <Button type="submit" variant="secondary" className="w-full">Log out</Button>
      </form>
    </aside>
  );
}
