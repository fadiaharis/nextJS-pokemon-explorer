export async function fetchPokemonList(limit: number, offset: number, signal?: AbortSignal) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`, { signal });
  if (!res.ok) throw new Error("Failed to fetch Pokémon list");
  return res.json();
}

export async function fetchPokemonDetails(id: string, signal?: AbortSignal) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { signal });
  if (!res.ok) throw new Error("Failed to fetch Pokémon details");
  return res.json();
}
