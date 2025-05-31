import { NextRequest, NextResponse } from 'next/server';
import { defaultCharacters as characters } from '@/app/data/characters';

export async function GET(req: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    
    console.log('API Request - Category:', category);
    
    // Return all characters if no category is provided or if category is 'all'
    if (!category || category.toLowerCase() === 'all') {
      console.log('Returning all characters:', characters.length);
      return NextResponse.json(characters);
    }
    
    // Filter characters by exact category match
    const filteredCharacters = characters.filter(char => {
      const matches = char.category === category;
      console.log(`Character ${char.name} (${char.category}) matches ${category}:`, matches);
      return matches;
    });
    
    console.log('Filtered characters count:', filteredCharacters.length);
    
    return new NextResponse(JSON.stringify(filteredCharacters), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error processing characters:', error);
    return NextResponse.json(
      { error: 'Failed to process characters' },
      { status: 500 }
    );
  }
}
