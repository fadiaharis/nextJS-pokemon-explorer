import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import PokemonCard from "../components/PokemonCard";
import { useQueryParams } from "../hooks/useQueryParams";
import { fetchPokemonList } from "../libs/api";
import { useFavorites } from "../hooks/useFavourites";

export default function Home() {
  const { favorites, toggleFavorite } = useFavorites();
  const { query, setQueryParams } = useQueryParams();

  const page = parseInt((query.page as string) || "1");
  const search = (query.q as string) || "";
  const showFavorites = query.favs === "true";

  const [data, setData] = useState<{ name: string }[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 20;

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      try {
        const offset = (page - 1) * limit;
        const res = await fetchPokemonList(limit, offset, controller.signal);
        setCount(res.count);
        let results = res.results;

        if (search) {
          results = results.filter((p: any) => p.name.includes(search.toLowerCase()));
        }
        if (showFavorites) {
          results = results.filter((p: any) => favorites.includes(p.name));
        }
        setData(results);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [page, search, showFavorites, favorites]);

  return (
    <Layout>
      <div className="flex gap-2 mb-4">
        <SearchBar initialValue={search} onSearch={(v) => setQueryParams({ q: v, page: 1 })} />
        <button
          onClick={() => setQueryParams({ favs: showFavorites ? undefined : "true", page: 1 })}
          className={`px-3 py-2 rounded ${showFavorites ? "bg-yellow-400" : "bg-gray-200"}`}
        >
          Favorites
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {!loading && data.length === 0 && <p>No results found.</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data.map((p) => (
          <PokemonCard
            key={p.name}
            name={p.name}
            isFavorite={favorites.includes(p.name)}
            onToggleFavorite={() => toggleFavorite(p.name)}
          />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={Math.ceil(count / limit)}
        onPageChange={(p) => setQueryParams({ page: p })}
      />
    </Layout>
  );
}
