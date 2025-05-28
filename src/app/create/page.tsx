'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import FormInput from './components/FormInput'
import FormTextarea from './components/FormTextarea'

interface CharacterFormData {
  name: string
  tagline: string
  greeting: string
  description: string
  visibility: 'public' | 'private'
  category: string
  imageUrl: string
}

export default function CreateCharacter() {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [formData, setFormData] = useState<CharacterFormData>({
    name: '',
    tagline: '',
    greeting: '',
    description: '',
    visibility: 'public',
    category: '',
    imageUrl: '/default-avatar.jpg'
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setFormData(prev => ({
          ...prev,
          imageUrl: reader.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newCharacter = {
      ...formData,
      id: Date.now().toString(),
      creator: 'User',
      interactions: 0,
      category: selectedCategory
    }
    const existingCharacters = JSON.parse(localStorage.getItem('characters') || '[]')
    localStorage.setItem('characters', JSON.stringify([...existingCharacters, newCharacter]))
    router.push('/')
    router.refresh()
  }

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <main className={`min-h-screen bg-[rgb(var(--background-rgb))] overflow-y-auto px-4 relative transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
        <div className="w-full flex justify-center py-6 relative">
          <div className="w-full max-w-screen-lg flex flex-col gap-8">
            {/* Header */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="text-gray-400 hover:text-white transition-colors p-2 -ml-2"
                  aria-label="Toggle sidebar"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isSidebarOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Create a Character
                </h1>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8 pb-10">
              {/* Form Card Container */}
              <div className="relative overflow-hidden bg-[rgb(var(--background-darker-rgb))] rounded-xl p-6 sm:p-8 border border-zinc-800 transition-all duration-300">
                
                {/* Form content */}
                <div className="relative z-10 space-y-8">
                  {/* Character Name */}
                  <div>
                    <FormInput
                      label="Character Name"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter character name"
                      className="w-full px-4 py-3 bg-[rgb(var(--background-rgb))] text-white rounded-lg border border-zinc-800 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200 hover:bg-[rgb(var(--background-lighter-rgb))]"
                    />
                  </div>

                  {/* Tagline */}
                  <div>
                    <FormInput
                      label="Tagline"
                      id="tagline"
                      name="tagline"
                      value={formData.tagline}
                      onChange={handleInputChange}
                      placeholder="A short, catchy line describing your character"
                      className="w-full px-4 py-3 bg-[rgb(var(--background-rgb))] text-white rounded-lg border border-zinc-800 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200 hover:bg-[rgb(var(--background-lighter-rgb))]"
                    />
                  </div>

                  {/* Greeting */}
                  <div>
                    <FormTextarea
                      label="Greeting Message"
                      id="greeting"
                      name="greeting"
                      value={formData.greeting}
                      onChange={handleInputChange}
                      placeholder="How does your character greet users?"
                      rows={2}
                      className="w-full px-4 py-3 bg-[rgb(var(--background-rgb))] text-white rounded-lg border border-zinc-800 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200 hover:bg-[rgb(var(--background-lighter-rgb))] resize-y min-h-[80px]"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <FormTextarea
                      label="Description"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your character's personality and capabilities"
                      rows={4}
                      className="w-full px-4 py-3 bg-[rgb(var(--background-rgb))] text-white rounded-lg border border-zinc-800 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200 hover:bg-[rgb(var(--background-lighter-rgb))] resize-y min-h-[120px]"
                    />
                  </div>

                  {/* Visibility */}
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium text-gray-300">Visibility</label>
                    <div className="flex flex-wrap gap-4">
                      {['public', 'private'].map(v => (
                        <label key={v} className="flex items-center cursor-pointer group">
                          <input
                            type="radio"
                            name="visibility"
                            value={v}
                            checked={formData.visibility === v}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-primary-600 bg-[rgb(var(--background-rgb))] border-zinc-800 focus:ring-primary-500 focus:ring-offset-0"
                          />
                          <span className="ml-2 text-gray-300 capitalize group-hover:text-white transition-colors">{v}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Category */}
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium text-gray-300">Category</label>
                    <div className="flex flex-wrap gap-2">
                      {['Maths', 'WWE', 'Science', 'AI', 'Humour', 'Writing', 'Literature', 'Social', 'Sports', 'News', 'Riddles'].map(category => (
                        <button
                          key={category}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(category)
                            setFormData(prev => ({ ...prev, category }))
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            selectedCategory === category
                              ? 'bg-primary-600 text-white border-primary-500 shadow-lg shadow-primary-500/20'
                              : 'bg-[rgb(var(--background-rgb))] text-gray-300 border border-zinc-800 hover:bg-[rgb(var(--background-lighter-rgb))] hover:text-white hover:border-zinc-700'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Avatar Upload */}
                  <div className="flex flex-col gap-3">
                    <label htmlFor="avatar" className="text-sm font-medium text-gray-300">Avatar Image</label>
                    <div className="w-full">
                      <label className="w-full flex flex-col items-center px-6 py-8 bg-[rgb(var(--background-rgb))] text-gray-300 rounded-lg border border-zinc-800 cursor-pointer hover:bg-[rgb(var(--background-lighter-rgb))] hover:border-zinc-700 transition-all duration-300 group">
                        {imagePreview ? (
                          <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg mb-4 border border-zinc-800 group-hover:border-zinc-700 transition-colors" />
                        ) : (
                          <div className="w-32 h-32 bg-[rgb(var(--background-darker-rgb))] rounded-lg mb-4 flex items-center justify-center border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                            <svg className="w-8 h-8 text-gray-400 group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        <input type="file" id="avatar" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        <span className="text-sm font-medium group-hover:text-white transition-colors">
                          {imagePreview ? 'Change Image' : 'Upload Image'}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button Container */}
                  <div className="relative overflow-hidden bg-[rgb(var(--background-darker-rgb))] rounded-xl p-3 sm:p-4 border border-zinc-800 transition-all duration-300 mt-8">
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="px-2 py-1.5 text-xs whitespace-nowrap bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-md shadow-lg shadow-primary-500/20 transition-all duration-300 flex items-center justify-center"
                      >
                        Create Character
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
