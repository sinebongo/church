"use client";

import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
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

type ChurchMemberField = Exclude<keyof ChurchMember, "id">;

// Matches spreadsheet column headers to our fields, tolerant of spacing/casing/naming variations.
const HEADER_ALIASES: Record<ChurchMemberField, string[]> = {
  name_and_surname: ["name and surname", "name", "full name", "member name", "surname"],
  parish: ["parish", "congregation"],
  biblical_scripture: ["biblical scripture", "scripture", "bible verse", "verse"],
  hymn: ["hymn", "song"],
};

function normalizeHeader(header: string) {
  return header.trim().toLowerCase().replace(/[_-]/g, " ").replace(/\s+/g, " ");
}

function mapRow(row: Record<string, unknown>): ChurchMember | null {
  const normalizedEntries = Object.entries(row).map(([k, v]) => [normalizeHeader(k), v] as const);
  const result: Partial<Record<ChurchMemberField, string>> = {};
  for (const field of Object.keys(HEADER_ALIASES) as ChurchMemberField[]) {
    const aliases = HEADER_ALIASES[field];
    const match = normalizedEntries.find(([header]) => aliases.includes(header));
    result[field] = match ? String(match[1] ?? "").trim() : "";
  }
  if (!result.name_and_surname) return null;
  return result as ChurchMember;
}

export default function AdminMembersPage() {
  const [members, setMembers] = useState<ChurchMember[]>([]);
  const [form, setForm] = useState<ChurchMember>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [importPreview, setImportPreview] = useState<ChurchMember[] | null>(null);
  const [importing, setImporting] = useState(false);

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

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);
      const mapped = rows.map(mapRow).filter((r): r is ChurchMember => r !== null);
      if (mapped.length === 0) {
        toast.error("No valid rows found — make sure there's a \"Name and Surname\" column.");
        return;
      }
      setImportPreview(mapped);
    } catch {
      toast.error("Couldn't read that file — make sure it's a valid Excel or CSV file.");
    }
  };

  const confirmImport = async () => {
    if (!importPreview) return;
    setImporting(true);
    const { error } = await supabase.from("church_members").insert(importPreview);
    setImporting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`Imported ${importPreview.length} member${importPreview.length === 1 ? "" : "s"}`);
    setImportPreview(null);
    fetchMembers();
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

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Bulk Import from Excel</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Upload an .xlsx, .xls, or .csv file with columns for Name and Surname, Parish, Biblical Scripture, and Hymn.
          </p>
          <Input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileSelect} />
          {importPreview && (
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-navy">
                Found {importPreview.length} member{importPreview.length === 1 ? "" : "s"} — review before importing:
              </p>
              <div className="max-h-64 overflow-y-auto border border-navy/15 rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Parish</TableHead>
                      <TableHead>Scripture</TableHead>
                      <TableHead>Hymn</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {importPreview.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell>{row.name_and_surname}</TableCell>
                        <TableCell>{row.parish}</TableCell>
                        <TableCell>{row.biblical_scripture}</TableCell>
                        <TableCell>{row.hymn}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex gap-2">
                <Button onClick={confirmImport} disabled={importing} className="bg-navy hover:bg-navy-dark">
                  {importing ? "Importing..." : `Import ${importPreview.length} Members`}
                </Button>
                <Button type="button" variant="secondary" onClick={() => setImportPreview(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
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
