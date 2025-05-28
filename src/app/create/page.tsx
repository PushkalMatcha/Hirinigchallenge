'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
    <div className="min-h-screen bg-black">
      <main className="min-h-screen bg-black overflow-y-auto px-4 relative">
        <div className="w-full flex justify-center py-6 relative">
          <div className="w-full max-w-screen-lg flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors p-2 -ml-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Create a Character
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 pb-10">
            {/* Form Fields Container */}
            <div className="space-y-6">
              {/* Character Name */}
              <div>
                <FormInput
                  label="Character Name"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter character name"
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
                />
              </div>

              {/* Visibility */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-300">Visibility</label>
                <div className="flex flex-wrap gap-4">
                  {['public', 'private'].map(v => (
                    <label key={v} className="flex items-center">
                      <input
                        type="radio"
                        name="visibility"
                        value={v}
                        checked={formData.visibility === v}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary-600 bg-zinc-900 border-zinc-800 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-300 capitalize">{v}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="flex flex-col gap-2">
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
                      className={`px-3 py-1.5 rounded-lg text-sm border transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-primary-600 text-white border-primary-500'
                          : 'bg-zinc-900 text-gray-300 border-zinc-800 hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Avatar Upload */}
              <div className="flex flex-col gap-2">
                <label htmlFor="avatar" className="text-sm font-medium text-gray-300">Avatar Image</label>
                <div className="w-full">
                  <label className="w-full flex flex-col items-center px-4 py-6 bg-zinc-900 text-gray-300 rounded-lg border border-zinc-800 cursor-pointer hover:bg-zinc-800 transition-colors">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg mb-2" />
                    ) : (
                      <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    )}
                    <span className="text-sm">{imagePreview ? 'Change image' : 'Upload an image'}</span>
                    <input
                      id="avatar"
                      name="avatar"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button Container */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 mt-6">
              <button
                type="submit"
                className="w-full px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-md font-medium hover:from-primary-700 hover:to-primary-600 transition-all duration-300"
              >
                Create Character
              </button>
            </div>
          </form>
          </div>
        </div>
      </main>
    </div>
  )
}

interface FormInputProps {
  label: string
  id: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

function FormInput({ label, id, name, value, onChange, placeholder }: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-300">{label}</label>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
        placeholder={placeholder}
      />
    </div>
  )
}

interface FormTextareaProps {
  label: string
  id: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  rows?: number
}

function FormTextarea({ label, id, name, value, onChange, placeholder, rows = 3 }: FormTextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-300">{label}</label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required
        rows={rows}
        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-y"
        placeholder={placeholder}
      />
    </div>
  )
}
