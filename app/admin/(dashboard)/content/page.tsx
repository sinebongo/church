"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const supabase = createClient();

interface ContentRow {
  id: string;
  section: string;
  key: string;
  label: string;
  value: string;
  type: string;
}

export default function AdminContentPage() {
  const [rows, setRows] = useState<ContentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const fetchContent = async () => {
    setLoading(true);
    const { data } = await supabase.from("site_content").select("*").order("section").order("sort_order");
    setRows(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const sections = Array.from(new Set(rows.map((r) => r.section)));

  const updateValue = (id: string, value: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, value } : r)));
  };

  const saveSection = async (section: string) => {
    setSaving(section);
    const sectionRows = rows.filter((r) => r.section === section);
    const { error } = await supabase
      .from("site_content")
      .upsert(sectionRows.map((r) => ({ id: r.id, section: r.section, key: r.key, label: r.label, value: r.value, type: r.type })));
    setSaving(null);
    if (error) toast.error(error.message);
    else toast.success(`${section} content saved`);
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-navy mb-6">Site Content</h1>
      <Tabs defaultValue={sections[0]}>
        <TabsList className="mb-4 flex-wrap h-auto">
          {sections.map((section) => (
            <TabsTrigger key={section} value={section} className="capitalize">
              {section.replace(/_/g, " ")}
            </TabsTrigger>
          ))}
        </TabsList>
        {sections.map((section) => (
          <TabsContent key={section} value={section}>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{section.replace(/_/g, " ")}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {rows
                  .filter((r) => r.section === section)
                  .map((row) => (
                    <div key={row.id} className="flex flex-col gap-1.5">
                      <Label>{row.label}</Label>
                      {row.type === "textarea" ? (
                        <Textarea value={row.value} onChange={(e) => updateValue(row.id, e.target.value)} rows={3} />
                      ) : (
                        <Input value={row.value} onChange={(e) => updateValue(row.id, e.target.value)} />
                      )}
                    </div>
                  ))}
                <Button
                  onClick={() => saveSection(section)}
                  disabled={saving === section}
                  className="bg-navy hover:bg-navy-dark self-start"
                >
                  {saving === section ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
