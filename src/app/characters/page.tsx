import { Suspense } from 'react';
import CharacterList from '@/components/CharacterList';
import LoadingCard from '@/components/LoadingCard';
import { Character } from '@/app/types/character';
import { getCharacters } from '@/app/services/api';

export default async function CharactersPage() {
  const characters = await getCharacters();

  return (
    <main className="min-h-screen p-4 sm:p-6 bg-[rgb(var(--background-rgb))]">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Characters</h1>
        </header>

        {/* Characters Grid */}
        <Suspense fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        }>
          <CharacterList initialCharacters={characters} />
        </Suspense>
      </div>
    </main>
  );
}
