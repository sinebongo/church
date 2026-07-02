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
import { toast } from "sonner";

const supabase = createClient();

interface Leader {
  id?: string;
  name: string;
  role: string;
  image_url: string;
  quote: string;
  quote_reference: string;
  is_senior_leader: boolean;
  sort_order: number;
}

const emptyForm: Leader = {
  name: "",
  role: "",
  image_url: "",
  quote: "",
  quote_reference: "",
  is_senior_leader: false,
  sort_order: 0,
};

export default function AdminLeadershipPage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [form, setForm] = useState<Leader>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchLeaders = async () => {
    setLoading(true);
    const { data } = await supabase.from("leadership").select("*").order("sort_order", { ascending: true });
    setLeaders(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = form.image_url;
    if (imageFile) {
      const { data, error } = await supabase.storage
        .from("leadership-images")
        .upload(`leadership/${Date.now()}_${imageFile.name}`, imageFile);
      if (error || !data?.path) {
        toast.error("Image upload failed");
        setLoading(false);
        return;
      }
      imageUrl = supabase.storage.from("leadership-images").getPublicUrl(data.path).data.publicUrl;
    }

    const payload = { ...form, image_url: imageUrl };

    if (editId) {
      const { error } = await supabase.from("leadership").update(payload).eq("id", editId);
      if (error) toast.error(error.message);
      else toast.success("Leader updated");
    } else {
      const { error } = await supabase.from("leadership").insert([payload]);
      if (error) toast.error(error.message);
      else toast.success("Leader added");
    }

    resetForm();
    fetchLeaders();
    setLoading(false);
  };

  const handleEdit = (leader: Leader) => {
    setEditId(leader.id!);
    setForm({
      name: leader.name,
      role: leader.role,
      image_url: leader.image_url || "",
      quote: leader.quote || "",
      quote_reference: leader.quote_reference || "",
      is_senior_leader: leader.is_senior_leader,
      sort_order: leader.sort_order,
    });
    setImageFile(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this leader?")) return;
    const { error } = await supabase.from("leadership").delete().eq("id", id);
    if (error) toast.error(error.message);
    else fetchLeaders();
  };

  const resetForm = () => {
    setForm(emptyForm);
    setImageFile(null);
    setEditId(null);
  };

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-navy mb-6">Leadership</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editId ? "Edit Leader" : "Add Leader"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Role</Label>
              <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Photo</Label>
              <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Sort Order</Label>
              <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
            </div>
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <Label>Quote (optional)</Label>
              <Textarea value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} rows={3} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Quote Reference (optional)</Label>
              <Input value={form.quote_reference} onChange={(e) => setForm({ ...form, quote_reference: e.target.value })} placeholder="e.g. 1 Thessalonians 5:21" />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.is_senior_leader} onCheckedChange={(checked) => setForm({ ...form, is_senior_leader: checked })} />
              <Label>Senior leader (shown on homepage)</Label>
            </div>
            <div className="md:col-span-2 flex gap-2">
              <Button type="submit" disabled={loading} className="bg-navy hover:bg-navy-dark">
                {editId ? "Update Leader" : "Add Leader"}
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
          <CardTitle>All Leaders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Senior</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaders.map((leader) => (
                <TableRow key={leader.id}>
                  <TableCell>{leader.name}</TableCell>
                  <TableCell>{leader.role}</TableCell>
                  <TableCell>{leader.is_senior_leader ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="secondary" onClick={() => handleEdit(leader)}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(leader.id!)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
