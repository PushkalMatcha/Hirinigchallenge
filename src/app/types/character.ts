export interface Character {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  avatar: string;
  creator: string;
  interactions: number;
  category?: string;
  greeting?: string;
}
