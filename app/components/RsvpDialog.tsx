"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface RsvpDialogProps {
  eventId: number;
  eventTitle: string;
  trigger?: React.ReactNode;
}

export function RsvpDialog({ eventId, eventTitle, trigger }: RsvpDialogProps) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    party_size: 1,
    notes: "",
  });

  const resetAndClose = () => {
    setOpen(false);
    setTimeout(() => {
      setSuccess(false);
      setError(null);
      setForm({ full_name: "", email: "", phone: "", party_size: 1, notes: "" });
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error } = await supabase.from("event_rsvps").insert([{ event_id: eventId, ...form }]);
    setSubmitting(false);
    if (error) {
      setError("Something went wrong — please try again.");
      return;
    }
    setSuccess(true);
    setTimeout(resetAndClose, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? setOpen(true) : resetAndClose())}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="bg-navy hover:bg-navy-dark">RSVP</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        {success ? (
          <div className="py-8 text-center">
            <p className="text-2xl mb-2">🎉</p>
            <p className="font-serif text-xl font-bold text-navy">You're registered!</p>
            <p className="text-muted-foreground mt-1">We'll see you at {eventTitle}.</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>RSVP for {eventTitle}</DialogTitle>
              <DialogDescription>Let us know you're coming — it helps us plan.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="full_name">Name</Label>
                <Input
                  id="full_name"
                  required
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="party_size">Number Attending</Label>
                <Input
                  id="party_size"
                  type="number"
                  min={1}
                  max={20}
                  required
                  value={form.party_size}
                  onChange={(e) => setForm({ ...form, party_size: Number(e.target.value) })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" disabled={submitting} className="bg-navy hover:bg-navy-dark">
                {submitting ? "Submitting..." : "Confirm RSVP"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
