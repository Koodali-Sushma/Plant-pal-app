import { useState } from "react";
import {
  FiltersIcon,
  LightIcon,
  WaterIcon,
  AutumnIcon,
  WinterIcon,
  SpringIcon,
  PartialShadeIcon,
  ChevronDownIcon,
  FullShadeIcon,
} from "../SvgIcons.js";

const Categories = [
  {
    key: "lightNeed",
    label: "Light",
    subtitle: "Select prefered light conditions",
    Icon: LightIcon,
    options: [
      { value: "Full Sun", Icon: LightIcon },
      { value: "Partial Shade", Icon: PartialShadeIcon },
      { value: "Full Shade", Icon: FullShadeIcon },
    ],
  },
  {
    key: "waterNeed",
    label: "Water",
    subtitle: "Select prefered water conditions",
    Icon: WaterIcon,
    options: [
      { value: "Low", drops: 1 },
      { value: "Medium", drops: 2 },
      { value: "High", drops: 3 },
    ],
  },
  {
    key: "fertiliserSeason",
    label: "Season",
    subtitle: "Select best season to fertilise",
    Icon: SpringIcon,
    options: [
      { value: "Spring", Icon: SpringIcon },
      { value: "Summer", Icon: LightIcon },
      { value: "Autumn", Icon: AutumnIcon },
      { value: "Winter", Icon: WinterIcon },
    ],
  },
];

function OptionIcon({ option, selected }) {
  const cls = `w-5 h-5 ${selected ? "text-(--color-primary-500)" : "text-gray-400"}`;
  if (option.drops) {
    return (
      <span className="flex gap-0.5">
        {Array.from({ length: option.drops }).map((_, i) => (
          <WaterIcon key={i} className={cls} stroke="currentColor" />
        ))}
      </span>
    );
  }
  const Icon = option.Icon;
  return <Icon className={cls} />;
}

export default function FilterButton({
  filters,
  toggleFilters,
  clearFilters,
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-10 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <FiltersIcon className="w-4 h-4 text-(--color-primary-500)" />
          Filters
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => clearFilters()}
            className="text-sm font-medium text-(--color-primary-500) underline underline-offset-2 hover:text-(--color-primary-500)"
          >
            Clear all
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Collapse filters" : "Expand filters"}
            aria-expanded={open}
            className="grid place-items-center w-7 h-7 rounded-md text-gray-500 hover:bg-gray-100"
          >
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-2 divide-y divide-gray-100">
          {Categories.map(({ key, label, subtitle, Icon, options }) => (
            <div
              key={key}
              className="flex flex-col gap-3 py-4 sm:flex-row sm:items-start"
            >
              {/* Left: icon + title + subtitle */}
              <div className="flex items-start gap-3 sm:w-44 sm:shrink-0">
                <div className="grid place-items-center w-9 h-9 rounded-lg bg-(--color-primary-100) text-(--color-primary-500) shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">
                    {label}
                  </div>
                  <div className="text-xs leading-tight text-gray-400">
                    {subtitle}
                  </div>
                </div>
              </div>

              {/* Right: option cards */}
              <div className="flex flex-wrap gap-2">
                {options.map((option) => {
                  const selected = filters[key].includes(option.value);
                  return (
                    <label
                      key={option.value}
                      className={`flex min-w-[84px] cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border px-3 py-2 text-xs font-medium transition-colors ${
                        selected
                          ? "border-(--color-primary-500) bg-green-50 text-(--color-primary-100)"
                          : "border-gray-200 bg-white text-gray-500 hover:border-(--color-primary-500) hover:bg-(--color-primary-500/40)"
                      }`}
                    >
                      <input
                        className="sr-only"
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleFilters(key, option.value)}
                      />
                      <OptionIcon option={option} selected={selected} />
                      {option.value}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
