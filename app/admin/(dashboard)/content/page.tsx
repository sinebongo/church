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
  const [uploadingId, setUploadingId] = useState<string | null>(null);

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

  const uploadImage = async (row: ContentRow, file: File) => {
    setUploadingId(row.id);
    const path = `${row.section}-${row.key}-${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from("site-images").upload(path, file, { upsert: true });
    if (error || !data?.path) {
      toast.error("Image upload failed");
      setUploadingId(null);
      return;
    }
    const publicUrl = supabase.storage.from("site-images").getPublicUrl(data.path).data.publicUrl;
    updateValue(row.id, publicUrl);
    const { error: saveError } = await supabase
      .from("site_content")
      .upsert({ id: row.id, section: row.section, key: row.key, label: row.label, value: publicUrl, type: row.type });
    setUploadingId(null);
    if (saveError) toast.error(saveError.message);
    else toast.success(`${row.label} updated`);
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
                      {row.type === "image_url" ? (
                        <div className="flex flex-col gap-2">
                          {row.value && (
                            row.value.match(/\.(mp4|webm|mov)$/i) ? (
                              <video src={row.value} className="w-full max-w-xs rounded-lg border border-navy/15" muted loop autoPlay />
                            ) : (
                              <img src={row.value} alt={row.label} className="w-full max-w-xs rounded-lg border border-navy/15 object-cover" />
                            )
                          )}
                          <Input
                            type="file"
                            accept="image/*,video/*"
                            disabled={uploadingId === row.id}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) uploadImage(row, file);
                            }}
                          />
                          {uploadingId === row.id && <p className="text-sm text-muted-foreground">Uploading...</p>}
                        </div>
                      ) : row.type === "textarea" ? (
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
