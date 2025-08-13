interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Search Pokémon..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
}
