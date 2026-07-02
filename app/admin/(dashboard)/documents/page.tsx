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

interface Doc {
  id: number;
  title: string;
  file_url: string;
  sort_order: number;
}

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const fetchDocuments = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("documents").select("*").order("sort_order", { ascending: true });
    if (!error && data) setDocuments(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    const { data, error } = await supabase.storage
      .from("documents")
      .upload(`docs/${Date.now()}_${file.name}`, file);
    if (error || !data?.path) {
      toast.error("Upload failed");
      setUploading(false);
      return;
    }
    const fileUrl = supabase.storage.from("documents").getPublicUrl(data.path).data.publicUrl;
    const nextSortOrder = documents.length > 0 ? Math.max(...documents.map((d) => d.sort_order)) + 1 : 0;
    const { error: insertError } = await supabase
      .from("documents")
      .insert([{ title, file_url: fileUrl, sort_order: nextSortOrder }]);
    setUploading(false);
    if (insertError) {
      toast.error(insertError.message);
      return;
    }
    toast.success("Document added");
    setTitle("");
    setFile(null);
    fetchDocuments();
  };

  const startEdit = (doc: Doc) => {
    setEditingId(doc.id);
    setEditingTitle(doc.title);
  };

  const saveTitle = async (id: number) => {
    const { error } = await supabase.from("documents").update({ title: editingTitle }).eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setEditingId(null);
    fetchDocuments();
  };

  const replaceFile = async (doc: Doc, newFile: File) => {
    const { data, error } = await supabase.storage
      .from("documents")
      .upload(`docs/${Date.now()}_${newFile.name}`, newFile);
    if (error || !data?.path) {
      toast.error("Upload failed");
      return;
    }
    const fileUrl = supabase.storage.from("documents").getPublicUrl(data.path).data.publicUrl;
    const { error: updateError } = await supabase.from("documents").update({ file_url: fileUrl }).eq("id", doc.id);
    if (updateError) {
      toast.error(updateError.message);
      return;
    }
    toast.success("File replaced");
    fetchDocuments();
  };

  const move = async (doc: Doc, direction: "up" | "down") => {
    const index = documents.findIndex((d) => d.id === doc.id);
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= documents.length) return;
    const swapDoc = documents[swapIndex];
    await Promise.all([
      supabase.from("documents").update({ sort_order: swapDoc.sort_order }).eq("id", doc.id),
      supabase.from("documents").update({ sort_order: doc.sort_order }).eq("id", swapDoc.id),
    ]);
    fetchDocuments();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this document?")) return;
    const { error } = await supabase.from("documents").delete().eq("id", id);
    if (error) toast.error(error.message);
    else fetchDocuments();
  };

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-navy mb-6">Documents</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add Document</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>File (PDF)</Label>
              <Input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} required />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" disabled={uploading || !file} className="bg-navy hover:bg-navy-dark">
                {uploading ? "Uploading..." : "Add Document"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Downloadable Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : documents.length === 0 ? (
            <p className="text-muted-foreground">No documents yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>File</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc, i) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      {editingId === doc.id ? (
                        <div className="flex gap-2">
                          <Input value={editingTitle} onChange={(e) => setEditingTitle(e.target.value)} />
                          <Button size="sm" onClick={() => saveTitle(doc.id)}>Save</Button>
                          <Button size="sm" variant="secondary" onClick={() => setEditingId(null)}>Cancel</Button>
                        </div>
                      ) : (
                        doc.title
                      )}
                    </TableCell>
                    <TableCell>
                      <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="text-navy underline">
                        View
                      </a>
                    </TableCell>
                    <TableCell className="text-right space-x-2 whitespace-nowrap">
                      <Button size="sm" variant="outline" disabled={i === 0} onClick={() => move(doc, "up")}>↑</Button>
                      <Button size="sm" variant="outline" disabled={i === documents.length - 1} onClick={() => move(doc, "down")}>↓</Button>
                      <Button size="sm" variant="secondary" onClick={() => startEdit(doc)}>Rename</Button>
                      <label className="inline-block">
                        <input
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) replaceFile(doc, f);
                          }}
                        />
                        <span className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium h-8 px-3 border bg-background shadow-xs hover:bg-accent">
                          Replace File
                        </span>
                      </label>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(doc.id)}>Delete</Button>
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
