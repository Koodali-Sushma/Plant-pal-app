import { SearchIcon} from "../SvgIcons"
export default function SearchBar({ value, onChange, searchBarState = false }) {
  return (
    <div className="relative flex-1">
      <SearchIcon className="pointer-events-none absolute left-3 top-6.5 h-5 w-5 -translate-y-1/2 text-gray-400" />
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search plants..."
      aria-label="Search plants"
      disabled={searchBarState}
      className="w-full rounded-xl border border-primary-500 bg-white py-3 pl-10 pr-4
        outline-none shadow-sm
        focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20
        disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60
        placeholder:text-gray-400
        mb-3"
    />
    </div>
  );
}
