import React, { useState, useEffect } from 'react';
// Add Supabase client import
import { createClient } from '@supabase/supabase-js';

interface ChurchMember {
  id: number;
  name_and_surname: string;
  parish: string;
  biblical_scripture: string;
  hymn: string;
  church_id: number;
}

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ChurchMembersList: React.FC = () => {
  const [search, setSearch] = useState('');
  const [members, setMembers] = useState<ChurchMember[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch members from Supabase
  const fetchMembers = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setMembers([]);
      return;
    }
    setLoading(true);

    // Supabase query: search by name or parish
    const { data, error } = await supabase
      .from('church_members')
      .select('*')
      .or(`name_and_surname.ilike.%${searchTerm}%,parish.ilike.%${searchTerm}%`);

    if (error) {
      setMembers([]);
    } else {
      setMembers(data as ChurchMember[]);
    }
    setLoading(false);
  };

  // Debounced search effect
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchMembers(search);
    }, 400); // 400ms debounce
    return () => clearTimeout(handler);
  }, [search]);

  // Manual search for button
  const handleSearch = () => {
    fetchMembers(search);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          className="flex-1 border border-blue-300 rounded-lg py-3 px-4 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 placeholder:text-blue-400"
          placeholder="🔍 Search by name or parish..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow hover:scale-105 hover:from-blue-600 hover:to-blue-800 transition duration-200"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Searching...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
              Search
            </span>
          )}
        </button>
      </div>
      <ul className="divide-y divide-blue-100">
        {!search && !loading && (
          <li className="text-gray-400 text-center py-8">Please enter a search to find members.</li>
        )}
        {search && members.length === 0 && !loading && (
          <li className="text-gray-400 text-center py-8">No members found.</li>
        )}
        {members.map(member => (
          <li
            key={member.id}
            className="py-4 px-3 bg-blue-50 rounded-lg mb-3 shadow-sm hover:bg-blue-100 transition"
          >
            <div className="font-bold text-lg text-blue-800">{member.name_and_surname}</div>
            <div className="text-sm text-blue-700 mt-1">
              <span className="font-semibold">Parish:</span> {member.parish}
            </div>
            <div className="text-sm text-blue-700">
              <span className="font-semibold">Scripture:</span> {member.biblical_scripture}
            </div>
            <div className="text-sm text-blue-700">
              <span className="font-semibold">Hymn:</span> {member.hymn}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChurchMembersList;
