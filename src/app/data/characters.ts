export interface Character {
  id: string
  name: string
  description?: string
  imageUrl: string
  avatar: string
  creator: string
  interactions: number
  greeting?: string
  category?: string
}

// Helper function to remove duplicates by ID
const removeDuplicates = (chars: Character[]): Character[] => {
  const seen = new Set();
  return chars.filter(char => {
    if (seen.has(char.id)) {
      return false;
    }
    seen.add(char.id);
    return true;
  });
};

export const defaultCharacters: Character[] = removeDuplicates([
  {
    id: '1',
    name: 'Math Tutor',
    description: 'I can help you with any math problem, from basic arithmetic to advanced calculus.',
    imageUrl: '/math.jpeg',
    avatar: '/math.jpeg',
    creator: 'Education Team',
    interactions: 75000,
    category: 'Education',
    greeting: "Ready to solve some math problems?"
  },
  {
    id: '2',
    name: 'The Rock',
    description: 'Can you smell what The Rock is cooking? Let\'s talk about wrestling, movies, and motivation!',
    imageUrl: '/rock.jpg',
    avatar: '/rock.jpg',
    creator: 'WWE Team',
    interactions: 250000,
    category: 'Entertainment',
    greeting: "Finally... The Rock has come back to chat with you!"
  },
  {
    id: '3',
    name: 'Neil deGrasse Tyson',
    description: 'Let\'s explore the cosmos together and unravel the mysteries of the universe.',
    imageUrl: '/neil.jpeg',
    avatar: '/neil.jpeg',
    creator: 'Science Team',
    interactions: 180000,
    category: 'Science',
    greeting: "The cosmos is within us. Let's explore it together!"
  },
  {
    id: '4',
    name: 'Joke Master',
    description: 'Need a laugh? I\'ve got jokes for days! Let me brighten your day with humor.',
    imageUrl: '/joke.jpg',
    avatar: '/joke.jpg',
    creator: 'Comedy Team',
    interactions: 120000,
    category: 'Entertainment',
    greeting: "Why did I become a comedian? Because I wanted to stand up for myself! 😄"
  },
  {
    id: '5',
    name: 'Writing Coach',
    description: 'From essays to novels, I\'ll help you improve your writing skills.',
    imageUrl: '/writing.webp',
    avatar: '/writing.webp',
    creator: 'Writing Team',
    interactions: 95000,
    category: 'Education',
    greeting: "Let's craft some amazing stories together!"
  },
  {
    id: '6',
    name: 'Sports Analyst',
    description: 'Deep dive into sports statistics, analysis, and predictions across all major leagues.',
    imageUrl: '/sports.jpg',
    avatar: '/sports.jpg',
    creator: 'Sports Team',
    interactions: 150000,
    category: 'Sports',
    greeting: "Game on! What sports shall we discuss today?"
  },
  {
    id: '7',
    name: 'News Anchor',
    description: 'Stay updated with the latest news and current events from around the world.',
    imageUrl: '/news.webp',
    avatar: '/news.webp',
    creator: 'News Team',
    interactions: 200000,
    category: 'News',
    greeting: "Breaking news! What would you like to know about today's events?"
  },
  {
    id: '8',
    name: 'Riddle Master',
    description: 'Challenge your mind with brain-teasers, riddles, and logical puzzles.',
    imageUrl: '/riddler.jpg',
    avatar: '/riddler.jpg',
    creator: 'Puzzle Team',
    interactions: 130000,
    category: 'Entertainment',
    greeting: "I speak without a mouth and hear without ears. What am I? Let's solve some riddles!"
  },
  {
    id: '9',
    name: 'Tech Guru',
    description: 'Your go-to expert for all things technology, from coding to gadgets.',
    imageUrl: '/tech.png',
    avatar: '/tech.png',
    creator: 'Tech Team',
    interactions: 180000,
    category: 'Technology',
    greeting: "Have you tried turning it off and on again? Just kidding! What tech questions do you have?"
  },
  {
    id: '10',
    name: 'Philosophy Prof',
    description: 'Explore deep questions about existence, knowledge, values, and reality.',
    imageUrl: '/philosophy.jpeg',
    avatar: '/philosophy.jpeg',
    creator: 'Philosophy Team',
    interactions: 90000,
    category: 'Education',
    greeting: "I think, therefore I am. What philosophical questions shall we ponder?"
  },
  {
    id: 'f1',
    name: 'Einstein AI',
    description: 'Explore physics and relativity with Einstein',
    imageUrl: '/einstein.jpg',
    avatar: '/einstein.jpg',
    creator: 'Science Team',
    interactions: 150000,
    category: 'Science',
    greeting: "E=mc², and that's just the beginning! What would you like to learn about physics?"
  },
  {
    id: 'f2',
    name: 'Shakespeare',
    description: 'Discuss literature and poetry with the Bard',
    imageUrl: '/Shakespeare.jpg',
    avatar: '/Shakespeare.jpg',
    creator: 'Literature Team',
    interactions: 120000,
    category: 'Literature',
    greeting: "To chat or not to chat, that is the question! What literary matters shall we discuss?"
  },
  {
    id: 'f3',
    name: 'Chef Gordon',
    description: 'Learn cooking from a master chef',
    imageUrl: '/chef2.jpg',
    avatar: '/chef2.jpg',
    creator: 'Culinary Team',
    interactions: 90000,
    category: 'Cooking',
    greeting: "Right then, you donut! Let's make something spectacular in the kitchen!"
  },
  {
    id: 'f4',
    name: 'Detective Holmes',
    description: 'Solve mysteries with the legendary detective',
    imageUrl: '/sherlock.jpg',
    avatar: '/sherlock.jpg',
    creator: 'Mystery Team',
    interactions: 100000,
    category: 'Mystery',
    greeting: "Elementary, my dear friend! What mystery shall we solve today?"
  },
  {
    id: 'beethoven',
    name: 'Beethoven',
    description: 'Explore classical music and composition with the legendary composer.',
    imageUrl: '/beethoven.jpeg',
    avatar: '/beethoven.jpeg',
    creator: 'Music Team',
    interactions: 280000,
    category: 'Music',
    greeting: 'Hello, I am Beethoven. Let us compose something beautiful together!'
  },
  {
    id: 'picasso',
    name: 'Picasso',
    description: 'Discover modern art and cubism with the revolutionary artist.',
    imageUrl: '/picasso.jpg',
    avatar: '/picasso.jpg',
    creator: 'Art Team',
    interactions: 320000,
    category: 'Art',
    greeting: 'Every act of creation is first an act of destruction. Let us create art!'
  },
  {
    id: 'ada',
    name: 'Ada Lovelace',
    description: 'Learn about computing history and algorithms with the first programmer.',
    imageUrl: '/ada.jpg',
    avatar: '/ada.jpg',
    creator: 'AI Team',
    interactions: 290000,
    category: 'Technology',
    greeting: 'Hello, I am Ada Lovelace. Let us discuss the poetry of numbers and logic!'
  },
  {
    id: 'tesla',
    name: 'Nikola Tesla',
    description: 'Explore electricity and innovation with the brilliant inventor.',
    imageUrl: '/tesla.avif',
    avatar: '/tesla.avif',
    creator: 'Science Team',
    interactions: 275000,
    category: 'Science',
    greeting: 'Greetings! I am Nikola Tesla. Let us spark some innovation together.'
  },
  {
    id: 'davinci',
    name: 'Leonardo da Vinci',
    description: 'Discover the intersection of art and science with the Renaissance master.',
    imageUrl: '/davinci.webp',
    avatar: '/davinci.webp',
    creator: 'Renaissance Team',
    interactions: 310000,
    category: 'Art & Science',
    greeting: 'Learning never exhausts the mind. What shall we explore today?'
  },
  {
    id: 'curie',
    name: 'Marie Curie',
    description: 'Learn about radioactivity and pioneering research in physics and chemistry.',
    imageUrl: '/curie.jpg',
    avatar: '/curie.jpg',
    creator: 'Science Team',
    interactions: 295000,
    category: 'Science',
    greeting: 'Hello, I am Marie Curie. Let us discover something new in science!'
  },
  {
    id: 'audi911',
    name: 'Audi 911',
    description: 'A high-performance Audi coupe with exceptional speed and luxury.',
    imageUrl: '/audi911.png',
    avatar: '/audi911.png',
    creator: 'Automotive Team',
    interactions: 50000,
    category: 'Cars',
    greeting: 'Welcome to the world of Audi 911! Let us drive into the details.'
  },
  {
    id: 'ai1',
    name: 'Neuralmind',
    description: 'An advanced AI assistant specializing in data analysis.',
    imageUrl: '/ai1.png',
    avatar: '/ai1.png',
    creator: 'AI Team',
    interactions: 100000,
    category: 'AI',
    greeting: 'Hello! I am Neuralmind, your AI assistant. How can I help you today?'
  },
  {
    id: 'sports1',
    name: 'Michael Jordan',
    description: 'A legendary basketball player with unmatched skills.',
    imageUrl: '/sports2.jpg',
    avatar: '/sports2.jpg',
    creator: 'Sports Team',
    interactions: 200000,
    category: 'Sports',
    greeting: 'Let’s talk about basketball and sportsmanship!'
  },
  {
    id: 'anime1',
    name: 'Hiro Kamikaze',
    description: 'A brave ninja with extraordinary abilities.',
    imageUrl: '/anime2.jpg',
    avatar: '/anime2.jpg',
    creator: 'Anime Team',
    interactions: 150000,
    category: 'Anime',
    greeting: 'Greetings! I am Hiro Kamikaze. Let’s embark on an adventure!'
  },
  {
    id: 'music1',
    name: 'Beethoven',
    description: 'A classical music composer of timeless masterpieces.',
    imageUrl: '/music2.jpg',
    avatar: '/music2.jpg',
    creator: 'Music Team',
    interactions: 300000,
    category: 'Music',
    greeting: 'Hello, I am Beethoven. Let us compose something beautiful together!'
  },
  {
    id: 'writing1',
    name: 'Jane Austen',
    description: 'A celebrated author known for her literary works.',
    imageUrl: '/Jane Austen.avif',
    avatar: '/Jane Austen.avif',
    creator: 'Writing Team',
    interactions: 120000,
    category: 'Writing',
    greeting: 'Let’s craft some amazing stories together!'
  },
  {
    id: 'cooking1',
    name: 'Chef Ramsay',
    description: 'A world-renowned chef with exceptional culinary skills.',
    imageUrl: '/Chef Ramsay.jpeg',
    avatar: '/Chef Ramsay.jpeg',
    creator: 'Culinary Team',
    interactions: 180000,
    category: 'Cooking',
    greeting: 'Let’s create a culinary masterpiece together!'
  },
  {
    id: 'car1',
    name: '911 GT3',
    description: 'A high-performance Audi coupe with exceptional speed and luxury.',
    imageUrl: '/911 GT3.jpg',
    avatar: '/911 GT3.jpg',
    creator: 'Automotive Team',
    interactions: 50000,
    category: 'Cars',
    greeting: 'Welcome to the world of Audi 911! Let us drive into the details.'
  },
  {
    id: 'bike1',
    name: 'Harley-Davidson Cruiser',
    description: 'A classic cruiser bike with unmatched style and performance.',
    imageUrl: '/Harley-Davidson Cruiser.AVIF',
    avatar: '/Harley-Davidson Cruiser.AVIF',
    creator: 'Bike Team',
    interactions: 75000,
    category: 'Bikes',
    greeting: 'Let’s hit the road with Harley-Davidson Cruiser!'
  }
])