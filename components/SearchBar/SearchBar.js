export default function SearchBar({
  value,
  onChange,
  searchBarState = false,
}) {
  return (
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="🔍Search plants..."
      aria-label="Search plants"
      disabled={searchBarState}
      className="flex-1 rounded-xl border border-primary-500 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-primary-700/30"
    />
  );
}
