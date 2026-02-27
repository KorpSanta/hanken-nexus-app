import { useState, useMemo } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ placeholder = "Search…", value, onChange }: SearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input pl-11 mb-[7px]" />

    </div>);

};

export default SearchBar;

// Hook for fuzzy filtering
export function useSearch<T>(items: T[], query: string, keys: (keyof T)[]) {
  return useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((item) =>
    keys.some((key) => {
      const val = item[key];
      return typeof val === "string" && val.toLowerCase().includes(q);
    })
    );
  }, [items, query, keys]);
}