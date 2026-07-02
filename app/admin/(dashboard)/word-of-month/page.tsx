"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const supabase = createClient();

export default function AdminWordOfMonthPage() {
  const [verse, setVerse] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchCurrent = async () => {
    const { data } = await supabase
      .from("word_of_month")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1);
    if (data && data.length > 0) {
      setVerse(data[0].verse);
      setMessage(data[0].message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCurrent();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    const { error } = await supabase
      .from("word_of_month")
      .insert([{ verse, message, updated_at: new Date().toISOString() }]);
    setUpdating(false);
    if (error) toast.error(error.message);
    else toast.success("Word of the Month updated");
  };

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-navy mb-6">Word of the Month</h1>
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Current Word</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label>Scripture Verse</Label>
                <Input value={verse} onChange={(e) => setVerse(e.target.value)} placeholder="e.g. Philippians 4:6" required />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Message / Quote</Label>
                <Textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} required />
              </div>
              <Button type="submit" disabled={updating} className="bg-navy hover:bg-navy-dark">
                {updating ? "Updating..." : "Update Word"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
