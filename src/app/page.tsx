'use client';
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import Pagination from './components/Pagination';
import PokemonCard from './components/PokemonCard';
import Layout from './components/Layout';

export default function HomePage() {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=200');
    const data = await res.json();
    const detailedData = await Promise.all(
      data.results.map(async (p: any) => {
        const details = await fetch(p.url).then((res) => res.json());
        return {
          id: details.id,
          name: details.name,
          image: details.sprites.front_default,
          types: details.types.map((t: any) => t.type.name),
        };
      })
    );
    setPokemons(detailedData);
    setFilteredPokemons(detailedData);
  };

  useEffect(() => {
    let results = pokemons;

    if (searchTerm) {
      results = results.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      results = results.filter((p) => p.types.includes(selectedType));
    }

    setFilteredPokemons(results);
    setCurrentPage(1);
  }, [searchTerm, selectedType, pokemons]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredPokemons.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <Filters selectedType={selectedType} onChange={setSelectedType} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentItems.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredPokemons.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </Layout>
  );
}
