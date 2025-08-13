interface Props {
  pokemon: {
    id: number;
    name: string;
    image: string;
    types: string[];
  };
}

export default function PokemonCard({ pokemon }: Props) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="w-20 h-20 object-contain"
      />
      <h2 className="text-lg font-semibold capitalize">{pokemon.name}</h2>
      <div className="flex gap-2 mt-2">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className="text-xs px-2 py-1 rounded-full bg-gray-100 capitalize"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}
