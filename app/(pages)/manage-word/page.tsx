"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ManageWordPage() {
  const [verse, setVerse] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [mounted, setMounted] = useState(false); // Track mount status

  useEffect(() => {
    setMounted(true); // Set mounted true after client mount
    const fetchWord = async () => {
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
    fetchWord();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    await supabase
      .from("word_of_month")
      .insert([{ verse, message, updated_at: new Date().toISOString() }]);
    setUpdating(false);
    setVerse("");
    setMessage("");
    alert("Word of the Month updated!");
  };

  // Only render after mount to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Manage Word of the Month</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8 space-y-4">
        <input
          value={verse}
          onChange={e => setVerse(e.target.value)}
          placeholder="Scripture Verse (e.g., Philippians 4:6)"
          className="border p-2 rounded w-full"
          required
        />
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Message/Quote"
          className="border p-2 rounded w-full"
          rows={4}
          required
        />
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
          disabled={updating}
        >
          {updating ? "Updating..." : "Update Word"}
        </button>
      </form>
    </div>
  );
}