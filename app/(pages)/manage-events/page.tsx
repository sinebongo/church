"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ManageEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    image: "",
    featured: false,
    color: "bg-gradient-to-br from-[#2f3a82] to-blue-600", // fixed value
  });
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });
    setEvents(data || []);
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (name === "color") return; // prevent manual change
    if (type === "checkbox" && "checked" in e.target) {
      setForm({
        ...form,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
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
        alert("Image upload failed");
        setSubmitting(false);
        return;
      }
      const publicUrlResponse = supabase.storage
        .from("event-images")
        .getPublicUrl(data.path);
      imageUrl = publicUrlResponse.data?.publicUrl || "";
    }

    if (editId) {
      // Update
      await supabase
        .from("events")
        .update({ ...form, image: imageUrl, updated_at: new Date().toISOString() })
        .eq("id", editId);
    } else {
      // Create
      await supabase
        .from("events")
        .insert([{ ...form, image: imageUrl, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }]);
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
      color: event.color || "",
    });
    setImageFile(null);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    await supabase.from("events").delete().eq("id", id);
    fetchEvents();
    if (editId === id) resetForm();
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "",
      image: "",
      featured: false,
      color: "bg-gradient-to-br from-[#2f3a82] to-blue-600", // fixed value
    });
    setImageFile(null);
    setEditId(null);
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Manage Events</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8 space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="border p-2 rounded w-full"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Event Description"
          className="border p-2 rounded w-full"
          rows={3}
          required
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          name="time"
          type="time"
          value={form.time}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="border p-2 rounded w-full"
          required
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 rounded w-full"
        />
        {imageFile && (
          <div className="mb-2">
            <span className="text-sm text-gray-500">Image Preview:</span>
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="mt-1 max-h-32 rounded"
            />
          </div>
        )}
        {form.image && !imageFile && (
          <div className="mb-2">
            <span className="text-sm text-gray-500">Current Image:</span>
            <img src={form.image} alt="Current" className="mt-1 max-h-32 rounded" />
          </div>
        )}
        <input
          name="color"
          value={form.color}
          onChange={handleChange}
          placeholder="Tailwind Color Class"
          className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
          disabled
        />
        <label className="flex items-center space-x-2">
          <input
            name="featured"
            type="checkbox"
            checked={form.featured}
            onChange={handleChange}
          />
          <span>Featured Event</span>
        </label>
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
            disabled={submitting}
          >
            {submitting ? (editId ? "Updating..." : "Adding...") : editId ? "Update Event" : "Add Event"}
          </button>
          {editId && (
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded font-semibold hover:bg-gray-500 transition"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
      {loading ? (
        <div className="text-center text-gray-500">Loading events...</div>
      ) : (
        <ul className="space-y-4">
          {events.map(event => (
            <li key={event.id} className="border p-4 rounded shadow">
              <div className="font-bold text-lg">{event.title}</div>
              <div className="text-gray-700">{event.description}</div>
              <div className="text-sm text-gray-500">
                {event.date} {event.time && `@ ${event.time}`} @ {event.location}
              </div>
              <div className="text-xs text-gray-400">
                {event.category} {event.featured ? "• Featured" : ""}
              </div>
              {event.image && (
                <img src={event.image} alt={event.title} className="mt-2 max-h-32 rounded" />
              )}
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                  onClick={() => handleEdit(event)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}