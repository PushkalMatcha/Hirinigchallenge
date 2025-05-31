import React from 'react';

const categories = ['AI', 'Sports', 'Anime', 'Music', 'Writing', 'Cooking', 'Cars', 'Bikes'];

interface NavbarProps {
  onCategorySelect: (category: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCategorySelect }) => {
  return (
    <nav className="flex justify-center space-x-4 bg-gray-800 text-white py-4">
      {categories.map((category) => (
        <button
          key={category}
          className="px-4 py-2 rounded hover:bg-gray-600"
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
