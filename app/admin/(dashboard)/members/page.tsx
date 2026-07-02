"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

const supabase = createClient();

interface ChurchMember {
  id?: number;
  name_and_surname: string;
  parish: string;
  biblical_scripture: string;
  hymn: string;
}

const emptyForm: ChurchMember = { name_and_surname: "", parish: "", biblical_scripture: "", hymn: "" };

export default function AdminMembersPage() {
  const [members, setMembers] = useState<ChurchMember[]>([]);
  const [form, setForm] = useState<ChurchMember>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchMembers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("church_members").select("*").order("id", { ascending: false });
    if (!error && data) setMembers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (editingId) {
      const { error } = await supabase.from("church_members").update(form).eq("id", editingId);
      if (error) toast.error(error.message);
      else {
        toast.success("Member updated");
        setForm(emptyForm);
        setEditingId(null);
        fetchMembers();
      }
    } else {
      const { error } = await supabase.from("church_members").insert([form]);
      if (error) toast.error(error.message);
      else {
        toast.success("Member added");
        setForm(emptyForm);
        fetchMembers();
      }
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this member?")) return;
    const { error } = await supabase.from("church_members").delete().eq("id", id);
    if (error) toast.error(error.message);
    else fetchMembers();
  };

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-navy mb-6">Church Members</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingId ? "Edit Member" : "Add Member"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>Name and Surname</Label>
              <Input value={form.name_and_surname} onChange={(e) => setForm({ ...form, name_and_surname: e.target.value })} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Parish</Label>
              <Input value={form.parish} onChange={(e) => setForm({ ...form, parish: e.target.value })} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Biblical Scripture</Label>
              <Input value={form.biblical_scripture} onChange={(e) => setForm({ ...form, biblical_scripture: e.target.value })} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Hymn</Label>
              <Input value={form.hymn} onChange={(e) => setForm({ ...form, hymn: e.target.value })} required />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <Button type="submit" disabled={loading} className="bg-navy hover:bg-navy-dark">
                {editingId ? "Update Member" : "Add Member"}
              </Button>
              {editingId && (
                <Button type="button" variant="secondary" onClick={() => { setEditingId(null); setForm(emptyForm); }}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Members</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Parish</TableHead>
                  <TableHead>Scripture</TableHead>
                  <TableHead>Hymn</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>{member.name_and_surname}</TableCell>
                    <TableCell>{member.parish}</TableCell>
                    <TableCell>{member.biblical_scripture}</TableCell>
                    <TableCell>{member.hymn}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="secondary" onClick={() => { setForm(member); setEditingId(member.id!); }}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(member.id!)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
