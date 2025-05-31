'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Character } from '@/app/types/character';
import CategoriesNav from '@/components/CategoriesNav';
import LoadingCard from '@/components/LoadingCard';

interface CharacterListProps {
  initialCharacters: Character[];
}

export default function CharacterList({ initialCharacters }: CharacterListProps) {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchCharacters();
  }, [selectedCategory]);

  const fetchCharacters = async () => {
    setIsLoading(true);
    try {
      const url = selectedCategory
        ? `/api/characters?category=${encodeURIComponent(selectedCategory)}`
        : '/api/characters';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch characters');
      const data = await response.json();
      setCharacters(data);
    } catch (error) {
      console.error('Error fetching characters:', error);
      // Fallback to initial characters on error
      setCharacters(initialCharacters);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <CategoriesNav
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        className="mb-6"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <LoadingCard key={`loading-${i}`} />
          ))
        ) : characters.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400 text-lg">No characters found</p>
          </div>
        ) : (
          characters.map((character) => (
            <Link
              key={character.id}
              href={`/chat/${character.id}`}
              className="block group"
            >
              <div className="bg-[rgb(var(--background-darker-rgb))] rounded-xl p-4 sm:p-6 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:bg-[rgb(var(--background-lighter-rgb))]">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                    <Image
                      src={character.avatar}
                      alt={character.name}
                      fill
                      className="rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg text-gray-100 font-semibold truncate group-hover:text-white">
                      {character.name}
                    </h3>
                    {character.description && (
                      <p className="text-sm text-gray-400 line-clamp-2 h-10 group-hover:text-gray-300">
                        {character.description}
                      </p>
                    )}
                    {character.category && (
                      <div className="mt-2 text-xs text-gray-500 group-hover:text-gray-400">
                        {character.category}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
