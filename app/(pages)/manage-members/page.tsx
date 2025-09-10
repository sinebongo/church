"use client";
import React, { useState, useEffect } from "react";

interface ChurchMember {
  id?: number;
  name_and_surname: string;
  parish: string;
  biblical_scripture: string;
  hymn: string;
  church_id?: number;
}

const ManageMembersPage: React.FC = () => {
  const [members, setMembers] = useState<ChurchMember[]>([]);
  const [form, setForm] = useState<ChurchMember>({
    name_and_surname: "",
    parish: "",
    biblical_scripture: "",
    hymn: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchMembers = async () => {
    setLoading(true);
    const res = await fetch("/api/church-members");
    if (res.ok) {
      setMembers(await res.json());
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/church-members?id=${editingId}` : "/api/church-members";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ name_and_surname: "", parish: "", biblical_scripture: "", hymn: "" });
      setEditingId(null);
      fetchMembers();
    }
    setLoading(false);
  };

  const handleEdit = (member: ChurchMember) => {
    setForm(member);
    setEditingId(member.id!);
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    const res = await fetch(`/api/church-members?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchMembers();
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Manage Church Members</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name_and_surname"
            value={form.name_and_surname}
            onChange={handleChange}
            placeholder="Name and Surname"
            className="border p-2 rounded"
            required
          />
          <input
            name="parish"
            value={form.parish}
            onChange={handleChange}
            placeholder="Parish"
            className="border p-2 rounded"
            required
          />
          <input
            name="biblical_scripture"
            value={form.biblical_scripture}
            onChange={handleChange}
            placeholder="Biblical Scripture"
            className="border p-2 rounded"
            required
          />
          <input
            name="hymn"
            value={form.hymn}
            onChange={handleChange}
            placeholder="Hymn"
            className="border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {editingId ? "Update Member" : "Add Member"}
        </button>
        {editingId && (
          <button
            type="button"
            className="ml-4 mt-4 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => { setEditingId(null); setForm({ name_and_surname: "", parish: "", biblical_scripture: "", hymn: "" }); }}
          >
            Cancel
          </button>
        )}
      </form>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Current Members</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="divide-y">
            {members.map((member) => (
              <li key={member.id} className="py-3 flex justify-between items-center">
                <div>
                  <span className="font-semibold text-blue-800">{member.name_and_surname}</span> - {member.parish}
                  <div className="text-sm text-gray-600">Scripture: {member.biblical_scripture} | Hymn: {member.hymn}</div>
                </div>
                <div>
                  <button
                    className="mr-2 px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                    onClick={() => handleEdit(member)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => handleDelete(member.id!)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <footer className="mt-10 text-center text-gray-400 text-xs sm:text-sm">
        &copy; {new Date().getFullYear()} Pretoria Circuit. All rights reserved.
      </footer>
    </div>
  );
};

export default ManageMembersPage;
// Footer for Manage Members page
// Add at the end of the main content
