import { SearchIcon } from "../SvgIcons";
export default function SearchBar({ value, onChange, searchBarState }) {
  return (
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="🔍  Search plants... eg. Monstera,...."
      aria-label="Search plants"
      disabled={searchBarState}
      className="w-full max-w-[300px] flex-1 rounded-xl border border-primary-500 bg-white px-4 py-3 
      outline-none shadow-sm 
      focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 
      disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60
      placeholder:text-gray-400
      mb-10 md:max-w-[900px] ml-3"
    />
  );
}
