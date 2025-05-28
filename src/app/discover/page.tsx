'use client'
import React, { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import CategoriesNav from '@/components/CategoriesNav'
import CharacterCard from '@/components/CharacterCard'
import LoadingCard from '@/components/LoadingCard'
import ScrollToTop from '@/components/ScrollToTop'
import Image from 'next/image'
import Link from 'next/link'
import { categories } from '../data/categories'
import { defaultCharacters } from '../data/characters'

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num)
}

export default function DiscoverPage() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [searchFocused, setSearchFocused] = useState(false)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredCharacters = defaultCharacters.filter(character => {
    const matchesCategory = !selectedCategory || character.category?.toLowerCase() === selectedCategory.toLowerCase()
    const matchesSearch = searchQuery === '' || 
      character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      character.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      character.category?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <main className={`flex-1 p-6 bg-[rgb(var(--background-rgb))] transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-6 flex items-center justify-between">
              <span>Discover Characters</span>
              <Link href="/" className="lg:hidden text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search characters by name, description, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={`w-full px-4 py-3 bg-[rgb(var(--background-lighter-rgb))] text-white rounded-xl border transition-all duration-300 pl-12 ${
                    searchFocused
                      ? 'border-primary-500 ring-2 ring-primary-500/20'
                      : 'border-zinc-800 hover:border-zinc-700'
                  }`}
                />
                <svg 
                  className={`w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                    searchFocused ? 'text-primary-500' : 'text-gray-400'
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </header>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-100 mb-6">Categories</h2>
            <CategoriesNav 
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </section>

          <section className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-100">
                {selectedCategory ? `${categories.find(c => c.value === selectedCategory)?.name} Characters` : 'All Characters'}
              </h2>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory('')}
                  className="text-primary-500 hover:text-primary-400 transition-colors text-sm flex items-center gap-2 group"
                >
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Clear filter
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <LoadingCard key={index} />
                ))
              ) : (
                filteredCharacters.map((character) => (
                  <CharacterCard
                    key={character.id}
                    {...character}
                  />
                ))
              )}
            </div>

            {!isLoading && filteredCharacters.length === 0 && (
              <div className="text-center py-12 bg-[rgb(var(--background-lighter-rgb))]/50 rounded-xl border border-zinc-800">
                <div className="text-gray-400 mb-2">No characters found</div>
                <button
                  onClick={() => {
                    setSelectedCategory('')
                    setSearchQuery('')
                  }}
                  className="text-primary-500 hover:text-primary-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Clear all filters
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
      <ScrollToTop />
    </>
  )
}