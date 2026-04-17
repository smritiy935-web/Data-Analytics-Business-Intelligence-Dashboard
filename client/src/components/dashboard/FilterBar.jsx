import React, { useState, useEffect } from "react";
import { Search, Calendar, Filter, XCircle } from "lucide-react";
import { useFilters } from "../../context/FilterContext";

const FilterBar = () => {
  const { filters, updateFilters, resetFilters } = useFilters();
  const [searchTerm, setSearchTerm] = useState(filters.search);

  // Auto-search logic (Debounce)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== filters.search) {
        updateFilters({ search: searchTerm });
      }
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Sync local search term if filters are reset externally
  useEffect(() => {
    setSearchTerm(filters.search);
  }, [filters.search]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "search") {
      setSearchTerm(value);
    } else {
      updateFilters({ [name]: value });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8 flex flex-wrap gap-4 items-center animate-in slide-in-from-top-4 duration-500">
      {/* Search Input */}
      <div className="flex-1 min-w-[240px] relative group">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors"
          size={18}
        />
        <input
          name="search"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Type to auto-search..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-primary-500/20 rounded-xl outline-none text-sm transition-all"
        />
      </div>

      {/* Date Range Group */}
      <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
        <Calendar size={16} className="text-primary-500" />
        <div className="flex items-center gap-1 group">
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleInputChange}
            className="bg-transparent border-none outline-none text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer"
          />
          <span className="text-slate-300 mx-1 font-bold">→</span>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleInputChange}
            className="bg-transparent border-none outline-none text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer"
          />
        </div>
      </div>

      {/* Category Dropdown */}
      <div className="relative">
        <Filter
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          size={16}
        />
        <select
          name="category"
          value={filters.category}
          onChange={handleInputChange}
          className="appearance-none bg-slate-50 dark:bg-slate-800 pl-10 pr-8 py-2.5 rounded-xl border border-slate-100 dark:border-slate-700 text-sm font-bold outline-none cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Fashion">Fashion</option>
          <option value="Grocery">Grocery</option>
        </select>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="flex items-center gap-2 px-5 py-2.5 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all text-sm font-black"
      >
        <XCircle size={18} /> Clear
      </button>
    </div>
  );
};

export default FilterBar;
