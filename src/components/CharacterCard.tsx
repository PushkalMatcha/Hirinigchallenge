import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface CharacterCardProps {
  id: string
  name: string
  description: string
  imageUrl: string
  category?: string
  creator: string
  interactions: number
}

export default function CharacterCard({ id, name, description, imageUrl, category, creator, interactions }: CharacterCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <Link
      href={`/chat/${id}`}
      className="group relative bg-[rgb(var(--background-darker-rgb))] rounded-xl p-4 sm:p-6 hover:shadow-xl hover:bg-[rgb(var(--background-lighter-rgb))] transition-all duration-300 border border-zinc-800 overflow-hidden"
    >
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10 flex items-start gap-3 sm:gap-4">
        <div className="relative w-12 h-12 sm:w-16 sm:h-16">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-zinc-800 rounded-full animate-pulse"></div>
          )}
          <Image
            src={imageUrl}
            alt={name}
            fill
            className={`rounded-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoadingComplete={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 rounded-full ring-2 ring-primary-500/0 group-hover:ring-primary-500/100 transition-all duration-300"></div>
        </div>
        
        <div className="flex-1 min-w-0">
          {category && (
            <span className="inline-block text-[10px] sm:text-xs font-medium text-primary-400 mb-1 transition-transform duration-300 group-hover:transform group-hover:translate-x-1">
              {category}
            </span>
          )}
          <h3 className="font-semibold text-base sm:text-lg text-gray-100 group-hover:text-primary-400 transition-colors truncate">
            {name}
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 mt-1 transition-all duration-300 group-hover:text-gray-300">
            {description}
          </p>
          <div className="mt-2 text-xs sm:text-sm text-gray-500 flex items-center gap-2">
            <span className="transition-all duration-300 group-hover:text-gray-400">By {creator}</span>
            <span className="text-zinc-700">•</span>
            <span className="transition-all duration-300 group-hover:text-gray-400">
              {formatNumber(interactions)} interactions
            </span>
          </div>
        </div>
      </div>

      {/* Interactive elements */}
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="p-1.5 sm:p-2 rounded-full bg-primary-500/10 text-primary-400">
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </Link>
  )
} 