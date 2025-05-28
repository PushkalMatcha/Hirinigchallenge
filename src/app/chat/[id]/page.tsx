'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react'
import { Character, defaultCharacters } from '../../data/characters'

interface Message {
  id: string
  content: string
  sender: 'user' | 'character'
  timestamp: number
  isTyping?: boolean
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num)
}

const responses = {
  science: [
    "Fascinating question! In scientific terms...",
    "Let me explain this using the laws of physics...",
    "This reminds me of an interesting experiment...",
  ],
  literature: [
    "As I wrote in one of my sonnets...",
    "This brings to mind a fascinating literary parallel...",
    "Let me share a poetic perspective on this...",
  ],
  cooking: [
    "The secret ingredient here is...",
    "Let me share a professional cooking tip...",
    "In my kitchen, we always...",
  ],
  mystery: [
    "After careful deduction...",
    "The clues suggest that...",
    "This mystery reminds me of a case...",
  ],
  default: [
    "That's an interesting perspective!",
    "Let me share my thoughts on this...",
    "Here's what I think about that...",
  ]
}

export default function ChatPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [character, setCharacter] = useState<Character | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [theme, setTheme] = useState<'dark' | 'darker'>('dark')

  useEffect(() => {
    setMounted(true)
    try {
      // Load character data
      const userCharacters = JSON.parse(localStorage.getItem('characters') || '[]')
      const allCharacters = [...defaultCharacters, ...userCharacters]
      const foundCharacter = allCharacters.find(c => c.id === params.id)
      
      if (foundCharacter) {
        setCharacter(foundCharacter)
        // Add greeting message if it exists
        if (foundCharacter.greeting) {
          setMessages([{
            id: '0',
            content: foundCharacter.greeting,
            sender: 'character',
            timestamp: Date.now()
          }])
        }
      }
    } catch (error) {
      console.error('Error loading character:', error)
    } finally {
      setIsLoading(false)
    }
  }, [params.id])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || !character) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: Date.now()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate character typing
    const typingMessage: Message = {
      id: 'typing',
      content: '...',
      sender: 'character',
      timestamp: Date.now(),
      isTyping: true
    }
    setMessages(prev => [...prev, typingMessage])

    // Simulate AI thinking time (1-2 seconds)
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    // Generate character response based on context
    const categoryResponses = responses[character.category?.toLowerCase() as keyof typeof responses] || responses.default
    const response = categoryResponses[Math.floor(Math.random() * categoryResponses.length)]
    
    // Remove typing indicator and add real response
    setMessages(prev => prev.filter(m => m.id !== 'typing'))
    setIsTyping(false)

    const characterMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response,
      sender: 'character',
      timestamp: Date.now()
    }

    setMessages(prev => [...prev, characterMessage])
    
    // Update interaction count
    const updatedCharacter = { ...character, interactions: character.interactions + 1 }
    setCharacter(updatedCharacter)
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'darker' : 'dark')
  }

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setInputMessage(prev => prev + emojiData.emoji)
    setShowEmoji(false)
  }

  if (!mounted || isLoading) {
    return (
      <main className={`flex-1 min-h-screen flex flex-col ${
        theme === 'dark' ? 'bg-zinc-900' : 'bg-black'
      }`}>
        <div className="border-b border-zinc-800 p-4 backdrop-blur-md bg-black/30">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-zinc-800 rounded animate-pulse"></div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-zinc-800 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="w-32 h-6 bg-zinc-800 rounded animate-pulse"></div>
                  <div className="w-48 h-4 bg-zinc-800 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-end gap-2">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse"></div>
                  <div className="max-w-[80%] rounded-2xl p-4 bg-zinc-800 animate-pulse">
                    <div className="w-64 h-4 bg-zinc-700 rounded"></div>
                    <div className="w-24 h-3 bg-zinc-700 rounded mt-2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!character) {
    return (
      <div className="flex-1 p-6 bg-black min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Character not found</p>
      </div>
    )
  }

  return (
    <main className="flex flex-col md:flex-row min-h-screen w-full bg-[#1E1E1E]">
      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="border-b border-[#2A2A2A] px-3 sm:px-6 py-4 w-full">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link 
              href="/" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <Image
                  src={character.imageUrl}
                  alt={character.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-semibold text-white">{character.name}</h1>
                <p className="text-xs sm:text-sm text-gray-400">
                  By @{character.creator} • {formatNumber(character.interactions)} interactions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 bg-[#1E1E1E] w-full">
          <div className="w-full max-w-none">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'character' && (
                    <div className="relative w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">
                      <Image
                        src={character.imageUrl}
                        alt={character.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-3 sm:p-4 ${
                      message.sender === 'user'
                        ? 'bg-[#2A2A2A] text-white rounded-br-sm'
                        : 'bg-[#2A2A2A] text-gray-100 rounded-bl-sm'
                    } ${message.isTyping ? 'animate-pulse' : ''}`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Message input */}
        <div className="border-t border-[#2A2A2A] px-3 sm:px-6 py-3 sm:py-4 w-full">
          <div className="w-full">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Message ${character.name}...`}
                className="flex-1 bg-[#2A2A2A] rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-100 focus:outline-none focus:ring-1 focus:ring-[#3A3A3A] placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="p-2 sm:p-3 bg-[#2A2A2A] text-white rounded-lg hover:bg-[#3A3A3A] transition-colors"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 12h14" />
                </svg>
              </button>
              <button
                type="button"
                className="p-2 sm:p-3 bg-[#2A2A2A] text-white rounded-lg hover:bg-[#3A3A3A] transition-colors"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0-11V3" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Right sidebar */}
      <div className="hidden md:flex w-full md:w-[320px] flex-shrink-0 border-t md:border-t-0 md:border-l border-[#2A2A2A] px-4 py-4 flex-col">
        <div className="flex flex-col gap-4">
          <button className="flex items-center gap-3 p-3 bg-[#2A2A2A] rounded-lg hover:bg-[#3A3A3A] transition-colors text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New chat
          </button>

          <button className="flex items-center justify-between p-3 bg-[#2A2A2A] rounded-lg hover:bg-[#3A3A3A] transition-colors text-white">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0-11V3" />
              </svg>
              Voice
            </div>
            <span className="text-sm text-gray-400">Default</span>
          </button>

          <button className="flex items-center justify-between p-3 bg-[#2A2A2A] rounded-lg hover:bg-[#3A3A3A] transition-colors text-white">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              History
            </div>
          </button>

          <button className="flex items-center justify-between p-3 bg-[#2A2A2A] rounded-lg hover:bg-[#3A3A3A] transition-colors text-white">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Customize
            </div>
          </button>

          <button className="flex items-center justify-between p-3 bg-[#2A2A2A] rounded-lg hover:bg-[#3A3A3A] transition-colors text-white">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Pinned
            </div>
          </button>

          <button className="flex items-center justify-between p-3 bg-[#2A2A2A] rounded-lg hover:bg-[#3A3A3A] transition-colors text-white">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Persona
            </div>
          </button>

          <button className="flex items-center justify-between p-3 bg-[#2A2A2A] rounded-lg hover:bg-[#3A3A3A] transition-colors text-white">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              Style
            </div>
          </button>
        </div>

        <div className="mt-6">
          <p className="text-xs sm:text-sm text-gray-400 mb-2">{character.description}</p>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-xs sm:text-sm text-gray-400">{formatNumber(character.interactions)} interactions</span>
          </div>
        </div>
      </div>
    </main>
  )
} 