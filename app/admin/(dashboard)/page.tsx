import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminHomePage() {
  const supabase = await createClient();

  const [events, members, leadership, content] = await Promise.all([
    supabase.from("events").select("id", { count: "exact", head: true }),
    supabase.from("church_members").select("id", { count: "exact", head: true }),
    supabase.from("leadership").select("id", { count: "exact", head: true }),
    supabase.from("site_content").select("id", { count: "exact", head: true }),
  ]);

  const cards = [
    { label: "Events", count: events.count ?? 0, href: "/admin/events" },
    { label: "Church Members", count: members.count ?? 0, href: "/admin/members" },
    { label: "Leadership", count: leadership.count ?? 0, href: "/admin/leadership" },
    { label: "Content Fields", count: content.count ?? 0, href: "/admin/content" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-navy mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link key={card.href} href={card.href}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">{card.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-navy">{card.count}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
