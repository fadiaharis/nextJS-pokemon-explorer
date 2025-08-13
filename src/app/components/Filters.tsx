const types = [
  '',
  'grass', 'fire', 'water', 'bug', 'normal',
  'poison', 'electric', 'ground', 'fairy',
  'fighting', 'psychic', 'rock', 'ghost', 'ice', 'dragon', 'dark', 'steel'
];

interface Props {
  selectedType: string;
  onChange: (value: string) => void;
}

export default function Filters({ selectedType, onChange }: Props) {
  return (
    <select
      value={selectedType}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">All Types</option>
      {types.map((type) => (
        type && <option key={type} value={type}>{type}</option>
      ))}
    </select>
  );
}
