export const categories = [
  { name: 'All', value: 'all' },
  { name: 'Science', value: 'Science' },
  { name: 'Art', value: 'Art' },
  { name: 'Literature', value: 'Literature' },
  { name: 'Technology', value: 'Technology' },
  { name: 'Education', value: 'Education' },
  { name: 'Entertainment', value: 'Entertainment' },
  { name: 'Sports', value: 'Sports' },
  { name: 'Music', value: 'Music' },
  { name: 'Cooking', value: 'Cooking' },
  { name: 'Mystery', value: 'Mystery' },
  { name: 'News', value: 'News' },
  { name: 'AI', value: 'AI' },
  { name: 'Cars', value: 'Cars' },
  { name: 'Bikes', value: 'Bikes' },
  { name: 'Writing', value: 'Writing' },
  { name: 'Anime', value: 'Anime' }
]

export type Category = typeof categories[number]['value']