'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';

const POPULAR_CITIES = ['Riyadh', 'Dubai', 'London', 'New York', 'Istanbul', 'Mecca', 'Medina'];

export default function SearchDropdown() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (city) => {
    setIsOpen(false);
    if (city.trim()) {
      router.push(`/prayer-times/${encodeURIComponent(city.trim())}`);
    }
  };

  const filteredCities = POPULAR_CITIES.filter(c => 
    c.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-md mx-auto z-50">
      <div className="relative flex items-center bg-black backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] px-4 py-3 transition-all focus-within:bg-white/20">
        <Search className="w-5 h-5 text-gray-300 mr-3" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
          placeholder="Search city for prayer times..."
          className="w-full bg-transparent text-white placeholder-gray-300 outline-none"
        />
        {/* Simple Auto Location Detect Button */}
        <button 
          onClick={() => handleSearch('Riyadh')} 
          className="ml-2 p-2 hover:bg-white/20 rounded-full transition-colors"
          title="Detect Location (Mocked to Riyadh)"
        >
          <MapPin className="w-5 h-5 text-gray-200" />
        </button>
      </div>

      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden text-white">
          {filteredCities.length > 0 ? (
            filteredCities.map(city => (
              <div 
                key={city}
                onClick={() => handleSearch(city)}
                className="px-5 py-3 hover:bg-white/10 cursor-pointer transition-colors"
              >
                {city}
              </div>
            ))
          ) : (
            <div 
              onClick={() => handleSearch(query)}
              className="px-5 py-3 hover:bg-white/10 cursor-pointer text-indigo-300"
            >
              Search for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}