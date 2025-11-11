# Tic-Tac-Cattle-Toe 🎮🐄

> A modern twist on the classic tic-tac-toe game featuring real-time weather integration and Scotland trivia

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![CSS Modules](https://img.shields.io/badge/CSS-Modules-06B6D4?style=flat-square&logo=css3)](https://github.com/css-modules/css-modules)
[![Jest](https://img.shields.io/badge/Jest-Testing-C21325?style=flat-square&logo=jest)](https://jestjs.io/)

## 🚀 Live Demo

**[Play the Game →](https://tictaccattletoe.vercel.app/)**

## 📋 Project Overview

This project started as a way to explore Next.js 16's new App Router and evolved into a comprehensive web application showcasing modern React development practices. What began as a simple tic-tac-toe game became an opportunity to integrate multiple technologies and create something unique.

## ⭐ Key Features

- **Interactive Gameplay** - Classic tic-tac-toe with strategic computer opponent
- **Weather Integration** - Real-time weather data from Scottish locations
- **Educational Content** - 50+ interesting facts about Scotland
- **Score Tracking** - Persistent game statistics using localStorage
- **Responsive Design** - Seamless experience across all device sizes
- **Progressive Web App** - Installable with offline capabilities

## 🛠 Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety and enhanced developer experience
- **React 19** - Latest React features including concurrent rendering
- **CSS Modules** - Scoped styling with zero runtime overhead
- **TanStack Query** - Powerful data fetching and caching

### Backend & APIs

- **Next.js API Routes** - Serverless API endpoints
- **WeatherAPI.com** - Real-time weather data integration
- **Geocoding Services** - Location coordinate resolution

### Development & Testing

- **Jest** - Unit and integration testing framework
- **React Testing Library** - Component testing utilities
- **ESLint** - Code quality and consistency
- **TypeScript Compiler** - Static type checking

### Deployment & Performance

- **Vercel** - Production hosting with automatic deployments
- **SEO Optimization** - Meta tags, Open Graph, and structured data
- **Performance Monitoring** - Core Web Vitals tracking

## 🎯 Development Highlights

### Architecture Decisions

- Implemented clean separation between game logic and UI components
- Used React Context for state management across the application
- Created custom hooks for reusable business logic
- Structured the project following Next.js best practices

### Performance Optimizations

- Lazy loading for non-critical components
- Efficient state management to minimize re-renders
- Optimized images and assets for faster loading
- Implemented proper caching strategies for API calls

### User Experience

- Smooth animations and transitions
- Intuitive game controls and feedback
- Accessible design with keyboard navigation
- Mobile-first responsive approach

## 🏗 Project Structure

```
tic-tac-cattle-toe/
├── app/                  # Next.js App Router
│   ├── components/       # Reusable React components
│   ├── providers/        # Context providers
│   ├── api/             # API route handlers
│   └── hooks/           # Custom React hooks
├── lib/                 # Shared utilities
│   ├── utils/          # Game logic and helpers
│   ├── types/          # TypeScript type definitions
│   └── constants/      # Application constants
├── tests/              # Test files and test utilities
└── public/             # Static assets
```

## � Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/Galiano19/tictaccattletoe.git
   cd tic-tac-cattle-toe
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Create .env.local and add your WeatherAPI key
   WEATHER_API_KEY=your_api_key_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 🧪 Testing

The project includes comprehensive testing with Jest and React Testing Library:

```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

**Current Test Coverage:**

- 100% coverage on game logic
- Component and API route testing included

## 🎮 How It Works

1. **Game Board** - Click any cell to make your move
2. **Strategy Engine** - The computer analyzes the board and makes strategic decisions
3. **Weather Widget** - Shows real-time weather for various Scottish locations
4. **Scotland Facts** - Click the cattle to learn something new about Scotland
5. **Statistics** - Your game history is saved and displayed

## 🚀 Deployment

Deployed on Vercel with automatic deployments from the main branch:

```bash
npm run build    # Build for production
npm start        # Start production server
```

## 🔧 Environment Variables

| Variable                          | Description            | Required |
| --------------------------------- | ---------------------- | -------- |
| `WEATHER_API_KEY`                 | WeatherAPI.com API key | Yes      |
| `NEXT_PUBLIC_COORDINATES_API_KEY` | WeatherAPI.com API key | Yes      |

## 🎨 Design & Styling

- **Mobile-First:** Responsive design starting from mobile
- **CSS Modules:** Scoped styling with no global conflicts
- **Accessibility:** WCAG 2.1 compliant with keyboard navigation
- **Animations:** Smooth transitions using CSS transforms

## 🧾 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

**Carlos Galiano** ([Galiano19](https://github.com/Galiano19))

This project demonstrates proficiency in:

- Modern React development with Next.js
- TypeScript for type-safe applications
- API integration and data fetching
- Component architecture and state management
- Testing strategies and implementation
- Performance optimization techniques
- SEO and web standards compliance

---

## 🙏 Acknowledgments

- **Weather Data**: [WeatherAPI.com](https://weatherapi.com)
- **Fonts**: [Geist Font Family](https://vercel.com/font) by Vercel
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Testing**: [React Testing Library](https://testing-library.com/)

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/Galiano19/tictaccattletoe?style=social)
![GitHub forks](https://img.shields.io/github/forks/Galiano19/tictaccattletoe?style=social)
![GitHub issues](https://img.shields.io/github/issues/Galiano19/tictaccattletoe)
![GitHub license](https://img.shields.io/github/license/Galiano19/tictaccattletoe)

---

<div align="center">

**🎮 [Start Playing Now!](https://tictaccattletoe.vercel.app/) 🎮**

_Built with ❤️ and ☕ by [Galiano19](https://github.com/Galiano19)_

</div>
