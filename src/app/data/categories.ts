export const categories = [
  { name: 'All', value: 'all' },
  { name: 'Science', value: 'science' },
  { name: 'Art', value: 'art' },
  { name: 'Literature', value: 'literature' },
  { name: 'History', value: 'history' },
  { name: 'Music', value: 'music' },
  { name: 'Philosophy', value: 'philosophy' },
  { name: 'Technology', value: 'technology' },
  { name: 'Fitness', value: 'fitness' },
  { name: 'Cooking', value: 'cooking' },
  { name: 'Language', value: 'language' },
  { name: 'Business', value: 'business' },
  { name: 'Psychology', value: 'psychology' },
  { name: 'Meditation', value: 'meditation' },
  { name: 'Education', value: 'education' },
  { name: 'Gaming', value: 'gaming' },
  { name: 'Travel', value: 'travel' },
  { name: 'Fashion', value: 'fashion' },
  { name: 'Sports', value: 'sports' },
  { name: 'Entertainment', value: 'entertainment' }
]

export type Category = typeof categories[number]['value'] 