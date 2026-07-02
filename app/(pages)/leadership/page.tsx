"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabaseClient";
import { PageHero } from "@/app/components/PageHero";
import { ScriptureQuote } from "@/app/components/ScriptureQuote";
import { useContent } from "@/app/context/ContentProvider";

const ChurchMembersList = dynamic(
  () => import("@/app/components/ChurchMembersList"),
  { ssr: false }
);

interface Leader {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
  quote: string | null;
  quote_reference: string | null;
  is_senior_leader: boolean;
}

const LeadershipPage = () => {
  const [seniorLeaders, setSeniorLeaders] = useState<Leader[]>([]);
  const [team, setTeam] = useState<Leader[]>([]);

  const pageHeading = useContent("leadership_page.heading", "Leadership");
  const membersHeading = useContent("leadership_page.members_heading", "Our Church Members");
  const membersBody = useContent(
    "leadership_page.members_body",
    "United in faith, diverse in gifts - together we shine brighter. Meet the heart of our community!"
  );

  useEffect(() => {
    const fetchLeadership = async () => {
      const { data } = await supabase
        .from("leadership")
        .select("*")
        .order("sort_order", { ascending: true });
      if (data) {
        setSeniorLeaders(data.filter((l) => l.is_senior_leader));
        setTeam(data.filter((l) => !l.is_senior_leader));
      }
    };
    fetchLeadership();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-b from-cream to-white"
    >
      <PageHero title={pageHeading} eyebrow="Leadership" />
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Bishop & Director Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {seniorLeaders.map((leader) => (
            <div key={leader.id} className="bg-white rounded-2xl p-8 flex flex-col items-center border border-navy/15 transition-colors hover:border-gold">
              {leader.image_url && (
                <img
                  src={leader.image_url}
                  alt={leader.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-gold mb-4 shadow"
                />
              )}
              <h2 className="font-serif text-lg md:text-2xl font-bold text-navy mb-1">{leader.name}</h2>
              <span className="text-base font-medium text-muted-foreground mb-2">{leader.role}</span>
              {leader.quote && (
                <ScriptureQuote reference={leader.quote_reference ?? undefined} className="text-center">
                  {leader.quote}
                </ScriptureQuote>
              )}
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-2xl border border-navy/15 p-8 mb-12">
          <h3 className="font-serif text-3xl font-bold mb-8 text-navy text-center tracking-wide">Leadership Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={member.id} className="flex flex-col items-center gap-2 p-6 rounded-2xl min-w-[180px] bg-cream border border-navy/15 transition-colors hover:border-gold">
                {member.image_url && (
                  <img
                    src={member.image_url}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover border-2 shadow mb-2"
                    style={{ borderColor: idx % 2 === 0 ? "#e1c575" : "#2f3a82" }}
                  />
                )}
                <span className="font-semibold text-navy text-lg text-center">{member.name}</span>
                <div className="text-sm text-muted-foreground text-center">{member.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Church Members Section */}
        <div className="relative bg-gradient-to-r from-navy via-gold/60 to-gold rounded-3xl p-10 mt-16 shadow-xl overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-serif text-4xl font-extrabold mb-4 text-center drop-shadow-lg tracking-tight text-white">
              {membersHeading}
            </h2>
            <p className="text-lg text-center mb-8 text-white/90 font-light">
              {membersBody}
            </p>
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: "backOut" }}
                viewport={{ once: true }}
                className="w-full"
              >
                <ChurchMembersList />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LeadershipPage;
