import React, { useState } from 'react';

type NavbarProps = {
  onSearch: (city: string) => void;
};

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchCity, setSearchCity] = useState('');

  const handleSearch = () => {
    if (searchCity.trim() !== '') {
      onSearch(searchCity);
      setSearchCity(''); 
    }
  };

  return (
    <div className="flex justify-start mb-8">
      <input
        type="text"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
        placeholder="Entrez le nom de la ville"
        className="px-4 py-2 rounded-lg border border-gray-300 shadow-md w-1/2 sm:w-1/3"
      />
      <button
        onClick={handleSearch}
        className="ml-4 px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600"
      >
        Rechercher
      </button>
    </div>
  );
};

export default Navbar;
