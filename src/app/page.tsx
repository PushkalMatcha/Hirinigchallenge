'use client'
import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Sidebar from '@/components/Sidebar'
import CategoriesNav from '@/components/CategoriesNav'
import CharacterCard from '@/components/CharacterCard'
import LoadingCard from '@/components/LoadingCard'
import ScrollToTop from '@/components/ScrollToTop'
import Image from 'next/image'
import Link from 'next/link'
import { Character, defaultCharacters } from './data/characters'
import { categories } from './data/categories'
import { useRouter } from 'next/navigation'

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num)
}

const featuredCharacters = [
  {
    id: 'f1',
    name: 'Einstein AI',
    description: 'Explore physics and relativity with Einstein',
    imageUrl: '/einstein.jpg',
    category: 'Science',
    creator: 'Science Team'
  },
  {
    id: 'f2',
    name: 'Shakespeare',
    description: 'Discuss literature and poetry with the Bard',
    imageUrl: '/Shakespeare.jpg',
    category: 'Literature',
    creator: 'Literature Team'
  },
  {
    id: 'f3',
    name: 'Chef Gordon',
    description: 'Learn cooking from a master chef',
    imageUrl: '/chef2.jpg',
    category: 'Cooking',
    creator: 'Culinary Team'
  },
  {
    id: 'f4',
    name: 'Detective Holmes',
    description: 'Solve mysteries with the legendary detective',
    imageUrl: '/sherlock.jpg',
    category: 'Mystery',
    creator: 'Mystery Team'
  }
]

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [characters, setCharacters] = useState<Character[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Add these for scroll-based animations
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0.7, 0.9], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1])
  const y = useTransform(scrollYProgress, [0.7, 0.9], [100, 0])
  const rotate = useTransform(scrollYProgress, [0.7, 0.9], [-10, 0])

  useEffect(() => {
    setMounted(true)
    // Set sidebar open by default only on desktop
    setIsSidebarOpen(window.innerWidth >= 768)
    
    const loadData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        const userCharacters = JSON.parse(localStorage.getItem('characters') || '[]')
        setCharacters([...defaultCharacters, ...userCharacters])
      } catch (error) {
        console.error('Error loading characters:', error)
        setCharacters(defaultCharacters)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()

    // Add resize listener to handle sidebar state
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filteredCharacters = characters.filter(character => {
    const matchesCategory = !selectedCategory || character.category?.toLowerCase() === selectedCategory.toLowerCase()
    const matchesSearch = searchQuery === '' || 
      character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      character.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      character.category?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleCategoryClick = (character: Character) => {
    router.push(`/chat/${character.id}?category=${encodeURIComponent(character.category || '')}`)
  }

  // Render loading skeleton before component mounts
  if (!mounted || isLoading) {
    return (
      <>
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className={`min-h-screen flex-1 p-4 sm:p-6 bg-[rgb(var(--background-rgb))] transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
          <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
            <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-zinc-800 rounded-lg animate-pulse"></div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-100">Welcome back,</h1>
              </div>
              <div className="w-full sm:w-72 h-10 bg-zinc-800 rounded-lg animate-pulse"></div>
            </header>

            <div className="relative w-full aspect-[3/1] rounded-lg sm:rounded-xl overflow-hidden bg-zinc-900 animate-pulse"></div>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-100">Featured</h2>
              <div className="flex overflow-x-auto gap-4 sm:gap-6 -mx-4 px-4 sm:-mx-6 sm:px-6 scrollbar-hide">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex-none w-[260px] sm:w-[300px] bg-zinc-900 rounded-xl p-4 sm:p-6 border border-zinc-800"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="w-full aspect-video bg-zinc-800 rounded-lg"></div>
                      <div className="space-y-2">
                        <div className="w-20 h-4 bg-zinc-800 rounded"></div>
                        <div className="w-40 h-6 bg-zinc-800 rounded"></div>
                        <div className="w-full h-4 bg-zinc-800 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <main className={`min-h-screen flex-1 p-4 sm:p-6 bg-[rgb(var(--background-rgb))] transition-all duration-300 overflow-x-hidden ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg bg-[rgb(var(--background-darker-rgb))] border border-zinc-800 hover:bg-[rgb(var(--background-lighter-rgb))] transition-all duration-300 hover:shadow-2xl"
                aria-label="Toggle sidebar"
              >
                <svg 
                  className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {isSidebarOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-100">Welcome back,</h1>
            </div>
            <div className="relative w-full sm:w-72">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search characters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={`w-full px-4 py-2 sm:py-3 bg-[rgb(var(--background-lighter-rgb))] text-white rounded-lg sm:rounded-xl border transition-all duration-300 pl-10 sm:pl-12 text-sm sm:text-base ${
                    searchFocused
                      ? 'border-primary-500 ring-2 ring-primary-500/20'
                      : 'border-zinc-800 hover:border-zinc-700'
                  }`}
                />
                <svg 
                  className={`w-5 h-5 sm:w-6 sm:h-6 absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
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

          <div className="relative w-full aspect-[3/1] rounded-lg sm:rounded-xl overflow-hidden bg-[rgb(var(--background-darker-rgb))]">
            <Image
              src="/banner.jpeg"
              alt="Welcome Banner"
              fill
              className="object-cover opacity-60"
              priority
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white drop-shadow-lg mb-1 sm:mb-2">What do you want to do today?</h2>
              <p className="text-sm sm:text-base md:text-xl text-white drop-shadow-lg">Epic challenges await</p>
            </div>
          </div>

          {/* For You section */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">For You</h2>
            <div className="flex overflow-x-auto gap-4 sm:gap-6 -mx-4 px-4 sm:-mx-6 sm:px-6 scrollbar-hide">
              {characters.map((character) => (
                <Link
                  key={character.id}
                  href={`/chat/${character.id}`}
                  className="flex-none w-[260px] sm:w-[300px] md:w-[350px] bg-[#1e1e1e] rounded-xl p-4 sm:p-6 border border-gray-700/50 transition-all duration-300 hover:bg-[#252525] hover:border-gray-600/50 hover:shadow-lg group"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16">
                      <Image
                        src={character.imageUrl}
                        alt={character.name}
                        fill
                        className="rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg text-gray-100 font-semibold truncate group-hover:text-white">{character.name}</h3>
                      <p className="text-sm text-gray-400 line-clamp-2 group-hover:text-gray-300">{character.description}</p>
                      <div className="mt-2 text-xs sm:text-sm text-gray-500 group-hover:text-gray-400">
                        By {character.creator} • {formatNumber(character.interactions)} interactions
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Popular section */}
          <section className="space-y-4 divide-y divide-gray-700/50">
            <h2 className="text-xl sm:text-2xl font-semibold text-white pb-4">Popular</h2>
            <div className="flex overflow-x-auto gap-4 sm:gap-6 -mx-4 px-4 sm:-mx-6 sm:px-6 scrollbar-hide pt-4">
              <Link
                href="/chat/beethoven"
                className="flex-none w-[280px] sm:w-[350px] bg-[#1e1e1e] rounded-xl p-4 sm:p-6 border border-gray-700/50 transition-all duration-300 hover:bg-[#252525] hover:border-gray-600/50 hover:shadow-lg group"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                    <Image
                      src="/beethoven.jpeg"
                      alt="Beethoven"
                      fill
                      className="rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base sm:text-lg text-gray-100 group-hover:text-white">Beethoven</h3>
                    <p className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300">Explore classical music and composition with the legendary composer.</p>
                    <div className="mt-2 text-xs sm:text-sm text-gray-500 group-hover:text-gray-400">
                      By Music Team • {formatNumber(280000)} interactions
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                href="/chat/picasso"
                className="flex-none w-[280px] sm:w-[350px] bg-[#1e1e1e] rounded-xl p-4 sm:p-6 border border-gray-700/50 transition-all duration-300 hover:bg-[#252525] hover:border-gray-600/50 hover:shadow-lg group"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                    <Image
                      src="/picasso.jpg"
                      alt="Picasso"
                      fill
                      className="rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base sm:text-lg text-gray-100 group-hover:text-white">Picasso</h3>
                    <p className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300">Discover modern art and cubism with the revolutionary artist.</p>
                    <div className="mt-2 text-xs sm:text-sm text-gray-500 group-hover:text-gray-400">
                      By Art Team • {formatNumber(320000)} interactions
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                href="/chat/ada"
                className="flex-none w-[280px] sm:w-[350px] bg-[#1e1e1e] rounded-xl p-4 sm:p-6 border border-gray-700/50 transition-all duration-300 hover:bg-[#252525] hover:border-gray-600/50 hover:shadow-lg group"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                    <Image
                      src="/ada.jpg"
                      alt="Ada Lovelace"
                      fill
                      className="rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base sm:text-lg text-gray-100 group-hover:text-white">Ada Lovelace</h3>
                    <p className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300">Learn about computing history and algorithms with the first programmer.</p>
                    <div className="mt-2 text-xs sm:text-sm text-gray-500 group-hover:text-gray-400">
                      By AI Team • {formatNumber(290000)} interactions
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                href="/chat/tesla"
                className="flex-none w-[280px] sm:w-[350px] bg-[#1e1e1e] rounded-xl p-4 sm:p-6 border border-gray-700/50 transition-all duration-300 hover:bg-[#252525] hover:border-gray-600/50 hover:shadow-lg group"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                    <Image
                      src="/tesla.avif"
                      alt="Nikola Tesla"
                      fill
                      className="rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-medium text-primary-400">Science</span>
                    <h3 className="font-semibold text-base sm:text-lg text-gray-100 mt-1 group-hover:text-white">Nikola Tesla</h3>
                    <p className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300">Explore electricity and innovation with the brilliant inventor.</p>
                    <div className="mt-2 text-xs sm:text-sm text-gray-500 group-hover:text-gray-400">
                      By Science Team • {formatNumber(275000)} interactions
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                href="/chat/davinci"
                className="flex-none w-[280px] sm:w-[350px] bg-[#1e1e1e] rounded-xl p-4 sm:p-6 border border-gray-700/50 transition-all duration-300 hover:bg-[#252525] hover:border-gray-600/50 hover:shadow-lg group"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                    <Image
                      src="/davinci.webp"
                      alt="Leonardo da Vinci"
                      fill
                      className="rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-medium text-primary-400">Art & Science</span>
                    <h3 className="font-semibold text-base sm:text-lg text-gray-100 mt-1 group-hover:text-white">Leonardo da Vinci</h3>
                    <p className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300">Discover the intersection of art and science with the Renaissance master.</p>
                    <div className="mt-2 text-xs sm:text-sm text-gray-500 group-hover:text-gray-400">
                      By Renaissance Team • {formatNumber(310000)} interactions
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                href="/chat/curie"
                className="flex-none w-[280px] sm:w-[350px] bg-[#1e1e1e] rounded-xl p-4 sm:p-6 border border-gray-700/50 transition-all duration-300 hover:bg-[#252525] hover:border-gray-600/50 hover:shadow-lg group"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                    <Image
                      src="/curie.jpg"
                      alt="Marie Curie"
                      fill
                      className="rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-medium text-primary-400">Science</span>
                    <h3 className="font-semibold text-base sm:text-lg text-gray-100 mt-1 group-hover:text-white">Marie Curie</h3>
                    <p className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300">Learn about radioactivity and pioneering research in physics and chemistry.</p>
                    <div className="mt-2 text-xs sm:text-sm text-gray-500 group-hover:text-gray-400">
                      By Science Team • {formatNumber(295000)} interactions
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Categories section */}
          <section className="space-y-4">
            <div className="max-w-screen-xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-semibold text-white pb-4">Browse by Category</h2>
              <CategoriesNav
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                className="mb-6"
              />
              {/* Horizontal scroll container */}
              <div className="relative -mx-4 sm:-mx-6">
                <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide px-4 sm:px-6 pb-4 space-x-4">
                  {isLoading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="inline-block flex-shrink-0 w-[280px] bg-[#1e1e1e] p-4 rounded-xl shadow-md border border-gray-700/50 transition-all duration-300 hover:bg-[#252525] hover:border-gray-600/50 hover:shadow-lg group"
                      >
                        <LoadingCard />
                      </div>
                    ))
                  ) : (
                    filteredCharacters.map((character) => (
                      <div 
                        key={character.id}
                        onClick={() => handleCategoryClick(character)}
                        className="inline-block flex-shrink-0 w-[280px] bg-[#1e1e1e] p-4 rounded-xl shadow-md border border-gray-700/50 transition-all duration-300 hover:bg-[#252525] hover:border-gray-600/50 hover:shadow-lg group cursor-pointer"
                      >
                        <div className="space-y-3">
                          <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                            <Image
                              src={character.imageUrl}
                              alt={character.name}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-gray-100 truncate group-hover:text-white">{character.name}</h3>
                            <p className="text-sm text-gray-400 line-clamp-2 h-10 group-hover:text-gray-300">{character.description}</p>
                            <div className="mt-2">
                              <span className="text-xs text-gray-500 truncate block group-hover:text-gray-400">By {character.creator}</span>
                              <span className="text-xs text-gray-500 group-hover:text-gray-400">{formatNumber(character.interactions)} interactions</span>
                            </div>
                          </div>
                        </div>

                        {/* Add a subtle arrow indicator for clickability */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="p-1.5 rounded-full bg-white/10 text-white/70">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Create Character section */}
          <section className="relative min-h-[400px] sm:min-h-[500px] flex items-center justify-center bg-[#1e1e1e] overflow-hidden rounded-xl border border-pink-600/20 transition-all duration-500 hover:bg-gradient-to-r hover:from-orange-500 hover:via-rose-500 hover:to-pink-600 hover:border-pink-400/30 hover:shadow-[0_0_25px_rgba(236,72,153,0.3)] group">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-40">
              {/* Animated gradient mesh */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.15), transparent 70%)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Animated grid */}
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(99,102,241,0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(99,102,241,0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Floating particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1.5 h-1.5 bg-primary-400/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}

              {/* Animated rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`ring-${i}`}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-primary-400/20 rounded-full"
                  style={{
                    width: `${300 + i * 100}px`,
                    height: `${300 + i * 100}px`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                    opacity: [0.1, 0.25, 0.1],
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}

              {/* Animated lines */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`line-${i}`}
                  className="absolute h-0.5 bg-gradient-to-r from-transparent via-primary-400/20 to-transparent"
                  style={{
                    width: '100%',
                    top: `${20 + i * 15}%`,
                    left: '-100%',
                  }}
                  animate={{
                    x: ['0%', '200%'],
                  }}
                  transition={{
                    duration: 8 + i,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5,
                  }}
                />
              ))}

              {/* Glowing orbs */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`orb-${i}`}
                  className="absolute w-32 h-32 rounded-full"
                  style={{
                    background: `radial-gradient(circle at center, rgba(99,102,241,0.15) 0%, transparent 70%)`,
                    left: `${25 * i}%`,
                    top: `${30 + (i % 2) * 20}%`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Existing background decorative elements */}
            <div className="absolute inset-0">
              {/* Floating character cards with labels */}
              <motion.div 
                className="absolute top-8 left-[20%] w-24 h-24"
                animate={{ y: [0, -8, 0], rotate: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image src="/einstein.jpg" alt="" fill className="rounded-lg object-cover" />
                <motion.div 
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                  animate={{ y: [0, -3, 0], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="px-4 py-2 bg-zinc-800/80 rounded-full text-sm text-primary-400">Science</span>
                </motion.div>
              </motion.div>
              <motion.div 
                className="absolute bottom-16 left-[30%] w-24 h-24"
                animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image src="/joke.jpg" alt="" fill className="rounded-lg object-cover" />
                <motion.div 
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                  animate={{ y: [0, -3, 0], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <span className="px-4 py-2 bg-zinc-800/80 rounded-full text-sm text-primary-400">Humour</span>
                </motion.div>
              </motion.div>
              <motion.div 
                className="absolute top-1/4 right-[25%] w-24 h-24"
                animate={{ y: [0, -12, 0], rotate: [5, -5, 5] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image src="/sherlock.jpg" alt="" fill className="rounded-lg object-cover" />
                <motion.div 
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                  animate={{ y: [0, -3, 0], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <span className="px-4 py-2 bg-zinc-800/80 rounded-full text-sm text-primary-400">Mystery</span>
                </motion.div>
              </motion.div>

              {/* Sound wave icons */}
              <motion.div 
                className="absolute top-12 left-[10%]"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-600">
                  <path d="M12 3v18M8 7v10M4 9v6M16 7v10M20 9v6" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.div>
              <motion.div 
                className="absolute bottom-20 right-[15%]"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-600">
                  <path d="M12 3v18M8 7v10M4 9v6M16 7v10M20 9v6" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.div>
            </div>

            {/* Main content */}
            <div className="text-center z-10 max-w-2xl mx-auto px-4 py-8 sm:py-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Create a Character</h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 group-hover:text-white/90">
                Not vibing with any Characters? Create one of your own! Customize things like their voice, conversation starts, their tone, and more!
              </p>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl border border-white/20 hover:bg-white hover:text-gray-900 transition-all duration-300 font-medium text-sm sm:text-base shadow-md hover:shadow-xl"
              >
                <svg 
                  className="w-4 h-4 sm:w-5 sm:h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create a Character
              </Link>
            </div>
          </section>
        </div>
      </main>
      <ScrollToTop />
    </>
  )
} 