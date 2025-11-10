# Tic-Tac-Cattle-Toe 🎮🐄

A smart tic-tac-toe game built with Next.js and TypeScript, featuring a weather information forecast for places in Scotland.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Services

### Geocoding Service

Location coordinates are retrieved from [geocode.maps.co](https://geocode.maps.co/)

### Weather Integration

The app integrates weather data based on the user's location coordinates for enhanced gameplay features.
TODO: fill with the API chosen

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Coordinates API Configuration
NEXT_PUBLIC_COORDINATES_API_KEY=your_api-KEY
```

## Game Logic

The AI opponent uses a strategic decision-making process:

1. **Winning Moves** - Always attempts to win if possible
2. **Blocking Moves** - Prevents player from winning
3. **Developing Moves** - Makes strategic positioning moves
4. **Random Moves** - Fallback for remaining positions

## Testing

Run the test suite:

```bash
npm test
# or
npm run test:watch  # for watch mode
```

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **CSS Modules** - Scoped styling
- **Jest** - Testing framework
- **React Testing Library** - Component testing utilities

## Project Structure

```
app/
├── components/          # React components
├── providers/          # Context providers
├── types/             # TypeScript type definitions
├── utils/             # Game logic and utilities
├── api/               # API route handlers
└── tests/             # Test files
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
