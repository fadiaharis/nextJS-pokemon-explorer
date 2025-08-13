import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useFavorites } from "@/app/hooks/useFavourites";
import { fetchPokemonDetails } from "@/app/libs/api";

export default function PokemonDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { favorites, toggleFavorite } = useFavorites();

  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      try {
        const res = await fetchPokemonDetails(id as string, controller.signal);
        setPokemon(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [id]);

  if (loading) return <Layout><p>Loading...</p></Layout>;
  if (!pokemon) return <Layout><p>Not found</p></Layout>;

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl capitalize">{pokemon.name}</h1>
        <button
          onClick={() => toggleFavorite(pokemon.name)}
          className={`px-3 py-1 rounded ${favorites.includes(pokemon.name) ? "bg-yellow-400" : "bg-gray-200"}`}
        >
          ★
        </button>
      </div>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="my-4" />
      <p><strong>Height:</strong> {pokemon.height}</p>
      <p><strong>Weight:</strong> {pokemon.weight}</p>
      <p className="mt-4"><strong>Types:</strong> {pokemon.types.map((t: any) => t.type.name).join(", ")}</p>
    </Layout>
  );
}
