# Project Structure

## Overview
A Character.ai clone built with Next.js 14, TypeScript, and Tailwind CSS. This project uses the App Router architecture for improved performance and better organization.

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: 
  - Tailwind CSS
  - CSS Modules
  - Framer Motion for animations
- **State Management**: React Hooks and Context
- **Data Fetching**: 
  - Next.js API Routes
  - Server Components
  - Server Actions

### Backend
- **API**: Next.js API Routes
- **Server**: Express.js (additional server)
- **Runtime**: Node.js

### Development Tools
- **Package Manager**: npm/pnpm
- **Linting & Formatting**:
  - ESLint
  - Prettier
  - TypeScript Strict Mode
- **Version Control**: Git
- **Build Tool**: Next.js built-in compiler

### Key Dependencies
- `next`: ^14.0.0
- `react`: ^18.0.0
- `typescript`: ^5.0.0
- `tailwindcss`: ^3.0.0
- `framer-motion`: For animations
- `express`: For additional server
- `@faker-js/faker`: For mock data generation

### Development Features
- Hot Module Replacement (HMR)
- TypeScript strict mode
- Tailwind JIT compilation
- API route development
- Server-side rendering
- Static site generation capabilities
- Dynamic imports and code splitting

## Directory Structure

### `/src/app` - Next.js 14 App Directory
- `api/characters/` - API endpoints for character management
- `chat/[id]/` - Dynamic chat interface pages
- `create/` - Character creation pages and forms
- `data/` - Data models and mock data
- `services/` - API service utilities
- `types/` - TypeScript type definitions
- `utils/` - Utility functions
- `globals.css` - Global styles
- `layout.tsx` - Root layout component
- `page.tsx` - Home page

### `/src/components` - Reusable Components
- UI Components:
  - `CharacterCard.tsx` - Character display card
  - `CharacterList.tsx` - List of characters
  - `CategoriesNav.tsx` - Category navigation
  - `Sidebar.tsx` - Application sidebar
  - `SearchAndFilter.tsx` - Search and filtering
- Utility Components:
  - `LoadingCard.tsx` - Loading state placeholders
  - `ErrorBoundary.tsx` - Error handling
  - `ScrollToTop.tsx` - Scroll utility
- Layout Components:
  - `AnimatedGrid.tsx` - Animated grid layout
  - `Navbar.tsx` - Navigation header

### `/public` - Static Assets
- Character avatar images
- UI icons and images
- SVG assets
- Default placeholder images

### `/server` - Backend Server
- Express.js server setup
- Character data JSON
- Server configurations

## Key Features
- Next.js 14 App Router
- TypeScript for type safety
- API Routes for backend functionality
- Dynamic routing for character pages
- Responsive components with Tailwind CSS
- Client and server-side rendering
- Error boundary implementation
- Loading state management
