import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { ScriptureQuote } from "./ScriptureQuote";

const LeadershipSection = async () => {
  const { data: leaders } = await supabase
    .from("leadership")
    .select("*")
    .eq("is_senior_leader", true)
    .order("sort_order", { ascending: true });

  const mainLeaders = leaders ?? [];

  return (
    <section id="leadership" className="w-full py-16 px-4 md:px-12 bg-gradient-to-br from-cream to-white">
      <div className="">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy text-center mb-10 tracking-tight">Meet Our Leadership</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {mainLeaders.map((leader) => (
            <div key={leader.id} className="bg-white rounded-2xl p-8 flex flex-col items-center border border-navy/15 transition-colors hover:border-gold">
              <div className="w-28 h-28 rounded-full border-4 border-gold shadow-lg overflow-hidden mb-4">
                {leader.image_url && (
                  <img src={leader.image_url} alt={leader.name} className="w-full h-full object-cover rounded-full" />
                )}
              </div>
              <h3 className="font-serif text-2xl font-bold text-navy mb-1">{leader.name}</h3>
              <p className="text-base font-medium text-muted-foreground mb-2">{leader.role}</p>
              {leader.quote && (
                <ScriptureQuote reference={leader.quote_reference ?? undefined} className="text-center">
                  {leader.quote}
                </ScriptureQuote>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Link href="/leadership" className="bg-navy hover:bg-gold hover:text-navy text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors duration-200 text-lg">
            View More Team Members
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
