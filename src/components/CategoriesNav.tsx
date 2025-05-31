import React, { useState } from 'react'
import { categories } from '@/app/data/categories'

interface CategoriesNavProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
  className?: string
}

export default function CategoriesNav({ selectedCategory, onSelectCategory, className = '' }: CategoriesNavProps) {
  const [showAll, setShowAll] = useState(false)
  const allCategory = categories.find(cat => cat.value === 'all')
  const filteredCategories = categories.filter(cat => cat.value !== 'all')
  const initialCategories = filteredCategories.slice(0, 7) // Show 7 categories + All by default
  const remainingCategories = filteredCategories.slice(7)

  return (
    <div className={`${className}`}>
      <div className="flex flex-wrap gap-2 sm:gap-4">
        {allCategory && (
          <button
            key={allCategory.value}
            onClick={() => onSelectCategory(allCategory.value)}
            className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 button-effect ${
              selectedCategory === allCategory.value || selectedCategory === ''
                ? 'bg-primary-600 text-white scale-105 shadow-lg'
                : 'bg-[rgb(var(--background-darker-rgb))] text-gray-200 hover:bg-[rgb(var(--background-lighter-rgb))] hover:scale-105 border border-zinc-800'
            }`}
          >
            {allCategory.name}
          </button>
        )}

        {initialCategories.map((category) => (
          <button
            key={category.value}
            onClick={() => onSelectCategory(category.value)}
            className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 button-effect ${
              selectedCategory === category.value
                ? 'bg-primary-600 text-white scale-105 shadow-lg'
                : 'bg-[rgb(var(--background-darker-rgb))] text-gray-200 hover:bg-[rgb(var(--background-lighter-rgb))] hover:scale-105 border border-zinc-800'
            }`}
          >
            {category.name}
          </button>
        ))}

        {!showAll && remainingCategories.length > 0 && (
          <button
            onClick={() => setShowAll(true)}
            className="px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 button-effect bg-[rgb(var(--background-darker-rgb))] text-primary-400 hover:bg-[rgb(var(--background-lighter-rgb))] hover:scale-105 border border-zinc-800 flex items-center gap-1 sm:gap-2"
          >
            <span>More</span>
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>

      {showAll && remainingCategories.length > 0 && (
        <div className="mt-2 sm:mt-4 animate-slideDown">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {remainingCategories.map((category) => (
              <button
                key={category.value}
                onClick={() => onSelectCategory(category.value)}
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 button-effect ${
                  selectedCategory === category.value
                    ? 'bg-primary-600 text-white scale-105 shadow-lg'
                    : 'bg-[rgb(var(--background-darker-rgb))] text-gray-200 hover:bg-[rgb(var(--background-lighter-rgb))] hover:scale-105 border border-zinc-800'
                }`}
              >
                {category.name}
              </button>
            ))}

            <button
              onClick={() => setShowAll(false)}
              className="px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 button-effect bg-[rgb(var(--background-darker-rgb))] text-primary-400 hover:bg-[rgb(var(--background-lighter-rgb))] hover:scale-105 border border-zinc-800 flex items-center gap-1 sm:gap-2"
            >
              <span>Show Less</span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}