import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface CharacterCardProps {
  id: string | number;
  name: string;
  description?: string;
  avatar: string;
  category?: string;
  // Common fields
  role?: string;
  experience?: string;
  
  // AI specific
  race?: string;
  capability?: string;
  specialization?: string;
  version?: string;
  uptime?: string;

  // Sports specific
  sport?: string;
  achievements?: string;
  rating?: string;

  // Anime specific
  class?: string;
  power?: string;
  rank?: string;
  specialMove?: string;
  powerLevel?: string;
  transformations?: number;

  // Music specific
  genre?: string;

  // Cooking specific
  style?: string;

  // Vehicles specific
  brand?: string;
  speed?: string;
  price?: string;

  // Mythology specific
  domain?: string;
  powers?: string;
  realm?: string;
  weapon?: string;

  // Historical specific
  era?: string;
  impact?: string;
  legacy?: string;

  // Scientist specific
  field?: string;
  discovery?: string;
  awards?: string;
  influence?: string;
}

export default function CharacterCard(props: CharacterCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const renderDetails = () => {
    switch (props.type) {
      case 'AI':
        return (
          <>
            <div className="text-primary-400">{props.race}</div>
            <div className="text-gray-400">{props.capability}</div>
          </>
        );
      case 'Sports':
        return (
          <>
            <div className="text-primary-400">{props.sport}</div>
            <div className="text-gray-400">{props.achievements}</div>
          </>
        );
      case 'Anime':
        return (
          <>
            <div className="text-primary-400">{props.class}</div>
            <div className="text-gray-400">{props.specialMove}</div>
          </>
        );
      // Add other cases for different character types
      default:
        return props.description && <div className="text-gray-400">{props.description}</div>;
    }
  };

  return (
    <Link
      href={`/chat/${props.id}`}
      className="group relative bg-[rgb(var(--background-darker-rgb))] rounded-xl p-4 sm:p-6 hover:shadow-xl hover:bg-[rgb(var(--background-lighter-rgb))] transition-all duration-300 border border-zinc-800 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10 flex items-start gap-3 sm:gap-4">
        <div className="relative w-12 h-12 sm:w-16 sm:h-16">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-zinc-800 rounded-full animate-pulse"></div>
          )}
          <Image
            src={props.avatar || '/avatar.svg'}
            alt={props.name}
            fill
            className={`rounded-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onError={(e) => {
              e.currentTarget.src = '/avatar.svg';
            }}
            onLoadingComplete={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 rounded-full ring-2 ring-primary-500/0 group-hover:ring-primary-500/100 transition-all duration-300"></div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="inline-block text-[10px] sm:text-xs font-medium text-primary-400 mb-1 transition-transform duration-300 group-hover:transform group-hover:translate-x-1">
            {props.type}
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-white truncate group-hover:text-primary-400 transition-colors duration-300">
            {props.name}
          </h3>
          {renderDetails()}
        </div>
      </div>
    </Link>
  );
}