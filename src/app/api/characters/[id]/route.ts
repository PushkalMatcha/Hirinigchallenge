import { NextRequest, NextResponse } from 'next/server';
import { defaultCharacters as characters } from '@/app/data/characters';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Find character by ID
    const character = characters.find(char => char.id.toString() === params.id);
    
    if (!character) {
      return NextResponse.json(
        { error: 'Character not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(character);
  } catch (error) {
    console.error('Error getting character:', error);
    return NextResponse.json(
      { error: 'Failed to get character' },
      { status: 500 }
    );
  }
}
