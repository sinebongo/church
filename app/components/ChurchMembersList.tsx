import React, { useState, useEffect } from 'react';

interface ChurchMember {
  id: number;
  name_and_surname: string;
  parish: string;
  biblical_scripture: string;
  hymn: string;
  church_id: number;
}

const ChurchMembersList: React.FC = () => {

  const [search, setSearch] = useState('');
  const [members, setMembers] = useState<ChurchMember[]>([]);
  const [loading, setLoading] = useState(false);




  const fetchMembers = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setMembers([]);
      return;
    }
    setLoading(true);
    let url = '/api/church-members?search=' + encodeURIComponent(searchTerm);
    const res = await fetch(url);
    if (res.ok) {
      setMembers(await res.json());
    } else {
      setMembers([]);
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

  // Keep manual search for button (optional, but now redundant)
  const handleSearch = () => {
    fetchMembers(search);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex mb-6">
        <input
          type="text"
          className="flex-1 border border-blue-300 rounded-l-lg  py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Search by name or parish..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-600 text-whitepx-6 py-2 rounded-r-lg font-semibold hover:bg-blue-700 transition"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
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
