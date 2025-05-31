import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Character } from '@/app/data/characters'

interface ChatHistory {
  id: string
  characterId: string
  characterName: string
  characterImage: string
  lastMessage: string
  timestamp: string
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    // In a real app, this would come from an API or database
    // For now, we'll simulate some chat history
    const mockChatHistory: ChatHistory[] = [
      {
        id: '1',
        characterId: 'f1',
        characterName: 'Einstein AI',
        characterImage: '/einstein.jpg',
        lastMessage: "Let's explore quantum mechanics!",
        timestamp: '2 min ago'
      },
      {
        id: '2',
        characterId: 'f2',
        characterName: 'Shakespeare',
        characterImage: '/Shakespeare.jpg',
        lastMessage: "Shall we discuss Hamlet?",
        timestamp: '1 hour ago'
      },
      {
        id: '3',
        characterId: '3',
        characterName: 'Neil deGrasse Tyson',
        characterImage: '/neil.jpeg',
        lastMessage: "The cosmos is full of mysteries...",
        timestamp: '2 hours ago'
      }
    ]
    setChatHistory(mockChatHistory)
  }, [])

  // Handle navigation and close sidebar on mobile
  const handleNavigation = useCallback((path: string) => {
    router.push(path)
    if (window.innerWidth < 768) { // Only close on mobile
      onToggle()
    }
  }, [router, onToggle])

  return (
    <>
      {/* Overlay - only shown on mobile when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity md:hidden z-40"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 w-[280px] sm:w-64 bg-[rgb(var(--background-darker-rgb))] h-screen flex flex-col border-r border-zinc-800 transform transition-all duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${mounted ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="p-3 sm:p-4">
          {/* Close button - only shown on mobile */}
          <button
            onClick={onToggle}
            className="md:hidden absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div 
            onClick={() => handleNavigation('/')}
            className={`flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 hover:opacity-80 transition-all duration-300 hover-lift cursor-pointer ${
              mounted ? 'animate-slide-in-left' : ''
            }`}
          >
            <div className="relative">
              <Image 
                src="/logo.jpg" 
                alt="Character.ai" 
                width={28}
                height={28}
                className="sm:w-8 sm:h-8"
              />
              <div className="absolute inset-0 bg-primary-500/20 rounded-full animate-pulse-glow"></div>
            </div>
            <span className="text-lg sm:text-xl font-semibold text-gray-100 animate-shimmer">character.ai</span>
          </div>
          
          <div 
            onClick={() => handleNavigation('/create')}
            className={`w-full bg-[rgb(var(--background-lighter-rgb))] rounded-lg p-2.5 sm:p-3 flex items-center gap-2 hover:bg-[rgb(var(--background-rgb))] transition-all duration-300 text-gray-100 hover-scale group cursor-pointer ${
              mounted ? 'animate-slide-in-left' : ''
            }`}
            style={{ animationDelay: '100ms' }}
          >
            <svg 
              className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:rotate-90" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-sm sm:text-base">Create</span>
          </div>
        </div>

        <nav className="px-2 space-y-1">
          {['/'].map((path, index) => (
            <div
              key={path}
              onClick={() => handleNavigation(path)}
              className={`flex items-center gap-2 p-2 rounded-lg hover:bg-[rgb(var(--background-rgb))] transition-all duration-300 text-gray-300 hover:text-gray-100 hover-lift cursor-pointer ${
                mounted ? 'animate-slide-in-left' : ''
              }`}
              style={{ animationDelay: `${200 + index * 100}ms` }}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-sm sm:text-base">Discover</span>
            </div>
          ))}
        </nav>

        <div className={`mt-4 sm:mt-6 px-3 sm:px-4 flex-1 overflow-y-auto ${mounted ? 'animate-slide-in-left' : ''}`} style={{ animationDelay: '400ms' }}>
          <h2 className="text-xs sm:text-sm font-medium text-gray-400 mb-2">Recent Chats</h2>
          <div className="space-y-1.5 sm:space-y-2">
            {chatHistory.map((chat, index) => (
              <div
                key={chat.id}
                onClick={() => handleNavigation(`/chat/${chat.characterId}`)}
                className={`flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-[rgb(var(--background-rgb))] transition-all duration-300 group hover-lift cursor-pointer ${
                  mounted ? 'animate-slide-in-left' : ''
                }`}
                style={{ animationDelay: `${500 + index * 100}ms` }}
              >
                <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                  <Image
                    src={chat.characterImage}
                    alt={chat.characterName}
                    fill
                    className="rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 right-0 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-primary-500 rounded-full border-2 border-[rgb(var(--background-darker-rgb))] animate-pulse-glow"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-sm font-medium text-gray-200 group-hover:text-white transition-colors truncate">
                    {chat.characterName}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-400 truncate animate-shimmer">{chat.lastMessage}</p>
                </div>
                <span className="text-[10px] sm:text-xs text-gray-500">{chat.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade button */}
        <div className="p-4 mt-auto border-t border-zinc-800">
          <button 
            onClick={() => handleNavigation('/upgrade')}
            className={`w-full bg-yellow-400 text-black font-semibold py-2.5 rounded-lg hover:bg-yellow-500 transition-all duration-300 flex items-center justify-center gap-2 ${
              mounted ? 'animate-slide-in-left' : ''
            }`}
            style={{ animationDelay: '600ms' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Upgrade Now
          </button>
        </div>
      </div>
    </>
  )
} 