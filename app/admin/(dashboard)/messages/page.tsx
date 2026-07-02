"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

const supabase = createClient();

interface ContactMessage {
  id: number;
  type: string;
  name: string | null;
  email: string;
  message: string | null;
  status: string;
  reply_message: string | null;
  replied_at: string | null;
  created_at: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyTarget, setReplyTarget] = useState<ContactMessage | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const openReply = (msg: ContactMessage) => {
    setReplyTarget(msg);
    setReplyText(msg.reply_message ?? "");
  };

  const sendReply = async () => {
    if (!replyTarget) return;
    setSending(true);
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "reply",
        to: replyTarget.email,
        subject: "Re: Your message to ELCSA CDYL",
        text: replyText,
      }),
    });
    const data = await res.json();
    if (!data.success) {
      toast.error(data.error || "Failed to send reply");
      setSending(false);
      return;
    }
    const { error } = await supabase
      .from("contact_messages")
      .update({ status: "replied", reply_message: replyText, replied_at: new Date().toISOString() })
      .eq("id", replyTarget.id);
    setSending(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Reply sent");
    setReplyTarget(null);
    setReplyText("");
    fetchMessages();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this message?")) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) toast.error(error.message);
    else fetchMessages();
  };

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-navy mb-6">Messages</h1>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-muted-foreground">No messages yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <Card key={msg.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">
                      {msg.name || msg.email} <span className="text-muted-foreground font-normal">&lt;{msg.email}&gt;</span>
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(msg.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={msg.type === "newsletter" ? "secondary" : "default"}>
                      {msg.type === "newsletter" ? "Newsletter" : "Contact"}
                    </Badge>
                    <Badge variant={msg.status === "replied" ? "secondary" : "destructive"}>
                      {msg.status === "replied" ? "Replied" : "New"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {msg.message && <p className="text-sm">{msg.message}</p>}
                {msg.reply_message && (
                  <div className="border-l-4 border-gold pl-4 text-sm text-muted-foreground">
                    <p className="font-medium text-navy mb-1">Your reply:</p>
                    {msg.reply_message}
                  </div>
                )}
                <div className="flex gap-2">
                  <Button size="sm" className="bg-navy hover:bg-navy-dark" onClick={() => openReply(msg)}>
                    {msg.status === "replied" ? "Reply Again" : "Reply"}
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(msg.id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!replyTarget} onOpenChange={(open) => !open && setReplyTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to {replyTarget?.name || replyTarget?.email}</DialogTitle>
            <DialogDescription>Sends an email directly to {replyTarget?.email}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-1.5">
            <Label>Message</Label>
            <Textarea rows={6} value={replyText} onChange={(e) => setReplyText(e.target.value)} />
          </div>
          <Button onClick={sendReply} disabled={sending || !replyText.trim()} className="bg-navy hover:bg-navy-dark self-start">
            {sending ? "Sending..." : "Send Reply"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
