'use client';

import { useState } from 'react';
import CategoriesNav from './CategoriesNav';

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onCategorySelect: (category: string) => void;
}

export default function SearchAndFilter({ onSearch, onCategorySelect }: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  return (
    <div className="space-y-4">
      <div className="w-full sm:w-72">
        <input
          type="text"
          placeholder="Search characters..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-4 py-2 bg-[rgb(var(--background-lighter-rgb))] text-white rounded-lg border border-zinc-800 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
        />
      </div>
      <CategoriesNav
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
        className="mb-6"
      />
    </div>
  );
}
