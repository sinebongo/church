"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

const supabase = createClient();

const emptyForm = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  category: "",
  image: "",
  featured: false,
  color: "bg-gradient-to-br from-[#2f3a82] to-blue-600",
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [rsvpCounts, setRsvpCounts] = useState<Record<number, number>>({});
  const [rsvpEventId, setRsvpEventId] = useState<number | null>(null);
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [rsvpsLoading, setRsvpsLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    const { data } = await supabase.from("events").select("*").order("date", { ascending: true });
    setEvents(data || []);
    setLoading(false);
  };

  const fetchRsvpCounts = async () => {
    const { data } = await supabase.from("event_rsvps").select("event_id");
    if (!data) return;
    const counts: Record<number, number> = {};
    for (const row of data) {
      counts[row.event_id] = (counts[row.event_id] ?? 0) + 1;
    }
    setRsvpCounts(counts);
  };

  useEffect(() => {
    fetchEvents();
    fetchRsvpCounts();
  }, []);

  const openRsvps = async (eventId: number) => {
    setRsvpEventId(eventId);
    setRsvpsLoading(true);
    const { data } = await supabase
      .from("event_rsvps")
      .select("*")
      .eq("event_id", eventId)
      .order("created_at", { ascending: false });
    setRsvps(data || []);
    setRsvpsLoading(false);
  };

  const exportRsvpsCsv = (eventTitle: string) => {
    const headers = ["Name", "Email", "Phone", "Party Size", "Notes", "Registered At"];
    const rows = rsvps.map((r) => [
      r.full_name,
      r.email,
      r.phone || "",
      r.party_size,
      r.notes || "",
      new Date(r.created_at).toLocaleString(),
    ]);
    const escapeCell = (cell: unknown) => `"${String(cell).replace(/"/g, '""')}"`;
    const csv = [headers, ...rows].map((row) => row.map(escapeCell).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${eventTitle.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-rsvps.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const deleteRsvp = async (id: number) => {
    const { error } = await supabase.from("event_rsvps").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setRsvps((prev) => prev.filter((r) => r.id !== id));
    fetchRsvpCounts();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    let imageUrl = form.image;
    if (imageFile) {
      const { data, error } = await supabase.storage
        .from("event-images")
        .upload(`events/${Date.now()}_${imageFile.name}`, imageFile);
      if (error || !data?.path) {
        toast.error("Image upload failed");
        setSubmitting(false);
        return;
      }
      imageUrl = supabase.storage.from("event-images").getPublicUrl(data.path).data.publicUrl;
    }

    if (editId) {
      const { error } = await supabase
        .from("events")
        .update({ ...form, image: imageUrl, updated_at: new Date().toISOString() })
        .eq("id", editId);
      if (error) toast.error(error.message);
      else toast.success("Event updated");
    } else {
      const { error } = await supabase
        .from("events")
        .insert([{ ...form, image: imageUrl, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }]);
      if (error) toast.error(error.message);
      else toast.success("Event created");
    }

    resetForm();
    fetchEvents();
    setSubmitting(false);
  };

  const handleEdit = (event: any) => {
    setEditId(event.id);
    setForm({
      title: event.title || "",
      description: event.description || "",
      date: event.date || "",
      time: event.time || "",
      location: event.location || "",
      category: event.category || "",
      image: event.image || "",
      featured: event.featured || false,
      color: event.color || emptyForm.color,
    });
    setImageFile(null);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this event?")) return;
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) toast.error(error.message);
    else toast.success("Event deleted");
    fetchEvents();
    if (editId === id) resetForm();
  };

  const resetForm = () => {
    setForm(emptyForm);
    setImageFile(null);
    setEditId(null);
  };

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-navy mb-6">Events</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editId ? "Edit Event" : "Add Event"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Category</Label>
              <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Date</Label>
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Time</Label>
              <Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Location</Label>
              <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Image</Label>
              <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} />
            </div>
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} required />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.featured} onCheckedChange={(checked) => setForm({ ...form, featured: checked })} />
              <Label>Featured event</Label>
            </div>
            <div className="md:col-span-2 flex gap-2">
              <Button type="submit" disabled={submitting} className="bg-navy hover:bg-navy-dark">
                {submitting ? (editId ? "Updating..." : "Adding...") : editId ? "Update Event" : "Add Event"}
              </Button>
              {editId && (
                <Button type="button" variant="secondary" onClick={resetForm}>Cancel</Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>RSVPs</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.date} {event.time}</TableCell>
                    <TableCell>{event.category}</TableCell>
                    <TableCell>{event.featured ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => openRsvps(event.id)}>
                        {rsvpCounts[event.id] ?? 0} registered
                      </Button>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="secondary" onClick={() => handleEdit(event)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(event.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={rsvpEventId !== null} onOpenChange={(open) => !open && setRsvpEventId(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between gap-4">
              <DialogTitle>
                RSVPs for {events.find((e) => e.id === rsvpEventId)?.title}
              </DialogTitle>
              {rsvps.length > 0 && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => exportRsvpsCsv(events.find((e) => e.id === rsvpEventId)?.title ?? "event")}
                >
                  Export CSV
                </Button>
              )}
            </div>
          </DialogHeader>
          {rsvpsLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : rsvps.length === 0 ? (
            <p className="text-muted-foreground">No RSVPs yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Party</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rsvps.map((rsvp) => (
                  <TableRow key={rsvp.id}>
                    <TableCell>{rsvp.full_name}</TableCell>
                    <TableCell>{rsvp.email}</TableCell>
                    <TableCell>{rsvp.phone || "—"}</TableCell>
                    <TableCell>{rsvp.party_size}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="destructive" onClick={() => deleteRsvp(rsvp.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
