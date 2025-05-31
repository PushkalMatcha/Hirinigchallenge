import { Character } from '../types/character';

export async function getCharacters(category?: string): Promise<Character[]> {
  const url = category 
    ? `/api/characters?category=${encodeURIComponent(category)}`
    : '/api/characters';
  
  console.log('Fetching characters from:', url);
        const response = await fetch(url, {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache'
    }
  });
  if (!response.ok) {
    console.error('API Error:', response.status, response.statusText);
    throw new Error('Failed to fetch characters');
  }
  const data = await response.json();
  console.log('API Response:', data.length, 'characters');
  return data;
}

export async function getCharacterById(id: string): Promise<Character | null> {
  try {
    const response = await fetch(`/api/characters/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch character');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching character:', error);
    throw error;
  }
}