# MovieBuff - Multi-Platform Movie Discovery App

A modern, high-performance monorepo application for discovering and exploring movies from The Movie Database. Built with React, Next.js, React Native, and Expo, demonstrating best practices for code reuse across web and mobile platforms.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🌟 Features

- 🎬 **Movie Discovery** - Browse popular, trending, upcoming, and top-rated movies
- 🔍 **Powerful Search** - Real-time search with pagination
- 📱 **Multi-Platform** - Seamless experience on web and mobile (iOS/Android)
- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations
- ⚡ **High Performance** - Optimized rendering with React.memo, memoization strategies
- 🔄 **State Management** - Redux Toolkit for predictable state
- 🛠️ **Monorepo** - Turborepo for efficient builds and sharing code
- ♿ **Accessible** - WCAG compliant with keyboard navigation
- 🧪 **Type Safe** - Full TypeScript support
- 📦 **Production Ready** - Error handling, loading states, retry logic
## 🚀 Quick Start

### Prerequisites
- **Node.js** >= 18 (required)
- **Yarn** >= 1.22.19 (required)
- **npm** or **npm cli** for package management
- **Xcode** (macOS) for iOS development
- **Android Studio** for Android development

### Installation

```bash
# Navigate to the project directory
cd MovieBuff

# Install all dependencies
yarn install
```

This command installs dependencies for the root, all apps, and all packages.

## 🏃 Running the Project

### Run Everything (Web + All Packages)
```bash
# Build all packages first, then start dev servers
yarn dev
```

This will:
1. Build all packages in `packages/`
2. Start both web and native development servers

### Run Web App Only
```bash
# Build packages and start Next.js dev server
yarn dev:web
```

Then open http://localhost:3000 in your browser.

**Available web routes:**
- `/` - Home (browse movies)
- `/movies/[id]` - Movie detail page
- `/watchlist` - Watchlist screen

### Run Native App Only
```bash
# Build packages and start Expo development server
yarn dev:native
```

Then choose:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web preview
- Scan QR code with Expo Go app on physical device

**Available mobile screens:**
- Home - Browse and search movies
- `movies/[id]` - Movie detail screen
- Watchlist tab - View saved watchlist

### Run Only Packages (Development Mode)
```bash
# Build and watch packages for changes
yarn dev:packages
```

## 📦 Dependencies Overview

### Root Level Dependencies
```json
{
  "@reduxjs/toolkit": "^1.9.7",
  "axios": "^1.6.2",
  "react-redux": "^8.1.3",
  "turbo": "^2.9.5",
  "redux": "^4.2.1",
  "prettier": "^3.1.1"
}
```

### Shared Across Platforms
- **redux** & **@reduxjs/toolkit**: State management
- **react-redux**: React bindings for Redux
- **axios**: HTTP client for API requests

### Web-Specific (apps/web)
- **next**: 16.2.0 - React framework for production
- **react** & **react-dom**: 19.2.0 - React library
- **tailwindcss**: 3.3.6 - Utility-first CSS
- **nativewind**: 2.0.11 - Tailwind for React Native

### Mobile-Specific (apps/native)
- **expo**: 55.0.4 - React Native development platform
- **expo-router**: 55.0.3 - File-based routing for React Native
- **react-native**: 0.83.2 - React framework for native apps
- **react-native-async-storage**: 1.24.0 - Persistent storage
## � Tech Stack

### Core Technologies
- **Monorepo**: Turborepo
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **API**: The Movie Database (TMDB) API

### Web Platform
- Next.js 16.2.0
- React 19.2.0
- React DOM 19.2.0
- TypeScript 5.9.2
- Tailwind CSS 3.3.6
- NativeWind 2.0.11

### Mobile Platform
- React Native 0.83.2
- Expo 55.0.4
- Expo Router 55.0.3
- React 19.2.0
- TypeScript 5.9.2
- React Native Async Storage 1.24.0
- NativeWind 2.0.11

### Shared Packages
- **@repo/api**: Centralized API client for TMDB
- **@repo/store**: Redux store with async thunks
- **@repo/ui**: Platform-specific UI components
- **@repo/typescript-config**: Shared TypeScript configurations

## 📁 Project Structure

```
MovieBuff/
├── apps/
│   ├── web/                    # Next.js web application
│   │   ├── app/               # Next.js app directory
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── movies/[id]/page.tsx    # Movie detail page
│   │   │   └── watchlist/page.tsx      # Watchlist page
│   │   └── styles/             # Global and module styles
│   │
│   └── native/                 # React Native + Expo app
│       ├── app/               # Expo Router app directory
│       │   ├── _layout.tsx
│       │   ├── index.tsx
│       │   ├── watchlist.tsx
│       │   └── movies/[id].tsx         # Movie detail screen
│       ├── metro.config.js    # Metro bundler configuration
│       └── app.json           # Expo configuration
│
├── packages/
│   ├── api/                   # The Movie DB API client
│   │   └── src/
│   │       ├── client.ts      # API client initialization
│   │       ├── config.ts      # Configuration
│   │       ├── types.ts       # TypeScript types
│   │       └── index.ts       # Exports
│   │
│   ├── store/                 # Redux store
│   │   └── src/
│   │       ├── store.ts       # Store configuration
│   │       ├── moviesSlice.ts # Movies state slice
│   │       ├── watchlistSlice.ts # Watchlist state slice
│   │       ├── storage.ts     # Web storage adapter
│   │       ├── storage.web.ts # Web-specific storage
│   │       ├── storage.native.ts # Native-specific storage
│   │       └── utils.ts       # Utilities
│   │
│   ├── ui/                    # Reusable UI components
│   │   └── src/
│   │       ├── atoms/         # Basic components (Button, etc.)
│   │       ├── molecules/     # Composed components (Rating, GenreTag)
│   │       ├── organisms/     # Complex components (MovieCard, MovieDetail)
│   │       ├── shared/        # Shared utilities, hooks, types
│   │       ├── index.ts       # Main export
│   │       ├── index.web.tsx  # Web-specific exports
│   │       └── index.native.tsx # Native-specific exports
│   │
│   └── typescript-config/     # Shared TypeScript configs
│       ├── base.json          # Base configuration
│       ├── nextjs.json        # Next.js specific config
│       └── react-native-library.json # React Native config
│
├── turbo.json                 # Turborepo configuration
├── package.json               # Root package configuration
└── README.md                  # This file
```

##  Build Commands

```bash
# Build all packages and apps
yarn build

# Production build - creates optimized artifacts
# Web: creates .next directory
# Packages: creates dist directories

# Clean all build artifacts and node_modules
yarn clean

# Format code with Prettier
yarn format
```

## 🌐 Environment Configuration

### Web App (.env.local)
```
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
NEXT_PUBLIC_TMDB_API_URL=https://api.themoviedb.org/3
```

### Native App (.env)
```
EXPO_PUBLIC_TMDB_API_KEY=your_api_key_here
EXPO_PUBLIC_TMDB_API_URL=https://api.themoviedb.org/3
```

Get your TMDB API key from: https://www.themoviedb.org/settings/api

## 📱 Platform-Specific Files

Components and modules use platform-specific extensions for different implementations:

```
Component.tsx              # Export/re-export point
├── Component.web.tsx      # Web implementation (Next.js)
├── Component.native.tsx   # Native implementation (React Native)
├── index.ts               # Exports
└── index.web.tsx          # Web-specific exports
    index.native.tsx       # Native-specific exports
```

Bundlers automatically resolve the correct file based on platform.

## 🔄 State Management

Redux store is centralized in `@repo/store`:

- **moviesSlice**: Manages movies listing and search
- **watchlistSlice**: Manages user's watchlist
- **storage**: Platform-specific persistence

The store automatically persists to:
- **Web**: `localStorage` via `redux-persist`
- **Native**: `AsyncStorage` via `redux-persist`

## 🛠️ Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Work on code**
   - Shared UI components: `packages/ui/src/`
   - API logic: `packages/api/src/`
   - State management: `packages/store/src/`
   - Web features: `apps/web/app/`
   - Mobile features: `apps/native/app/`

3. **Run dev server**
   ```bash
   yarn dev
   ```

4. **Format code**
   ```bash
   yarn format
   ```

5. **Build for production**
   ```bash
   yarn build
   ```

## 📞 API Integration

The app uses The Movie Database (TMDB) API. The client is centralized in `@repo/api`:

- **endpoints**: Popular, trending, upcoming, top-rated, search
- **image handling**: Automatic TMDB image URL generation
- **type safety**: Full TypeScript types for all responses

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Web: Default port 3000
# Native: Expo uses port 19000+
# If ports conflict, kill process and try again
```

### Dependencies Not Installed Properly
```bash
# Clean and reinstall
yarn clean
yarn install
```

### Module Resolution Issues
```bash
# Rebuild packages
yarn build --filter='./packages/*'
```

### Native App Build Errors
```bash
# Clear Expo cache
yarn dev:native --clear

# Reinstall Expo
yarn add expo@latest
```

## 📚 Additional Resources

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Native Documentation](https://reactnative.dev/docs)
- [Expo Documentation](https://docs.expo.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [TMDB API Documentation](https://developer.themoviedb.org/docs/getting-started)

## 📄 License

MIT License - see LICENSE file for details

## 👤 Contributing

Contributions are welcome! Please follow the development workflow and ensure code is formatted with Prettier before submitting pull requests.

# Configure API keys (get from https://www.themoviedb.org/settings/api)
cp apps/web/.env.local.example apps/web/.env.local
cp apps/native/.env.local.example apps/native/.env.local

# Edit both .env.local files and add your API key:
# NEXT_PUBLIC_TMDB_API_KEY=your_key_here (web)
# EXPO_PUBLIC_TMDB_API_KEY=your_key_here (native)
```

### Running Applications

```bash
# Start both web and native dev servers
yarn dev

# Or run individually:
cd apps/web && yarn dev           # Web: http://localhost:3000
cd apps/native && yarn dev        # Native: Expo CLI
```

## 🏗️ Architecture Highlights

### 1. **Code Reuse & Monorepo**
- **Turborepo** manages builds and caching
- Shared packages: API client, state management, UI components
- Platform-specific implementations automatically resolved

### 2. **Platform-Specific Components**
```typescript
// Automatic bundler resolution
MovieCard.web.tsx    → Web platform
MovieCard.native.tsx → Mobile platform
MovieCard.tsx        → Default export
```

### 3. **State Management**
```typescript
// Redux Toolkit for centralized, platform-agnostic state
const store = configureStore({
  reducer: { movies: moviesReducer }
})
```

### 4. **Performance Optimizations**
- `React.memo` - Prevent unnecessary re-renders
- `useMemo` - Memoize expensive calculations
- `useCallback` - Memoize event handlers
- `StyleSheet.create()` - Native performance (StyleSheet API)
- Image optimization and lazy loading

### 5. **Navigation**
- **Web**: Next.js file-based routing
- **Native**: Expo Router (Next.js-like syntax)

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Complete setup and development guide
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Detailed architectural decisions
- **[packages/api/README.md](./packages/api/README.md)** - API client documentation
- **[packages/store/README.md](./packages/store/README.md)** - Redux store guide
- **[packages/ui/README.md](./packages/ui/README.md)** - UI components guide
- **[apps/web/README.md](./apps/web/README.md)** - Web app specific docs
- **[apps/native/README.md](./apps/native/README.md)** - Native app specific docs

## 🎯 Key Technologies

### Monorepo & Build
- **Turborepo** - Monorepo build system
- **Yarn Workspaces** - Dependency management

### Web Platform
- **Next.js 16** - React framework
- **React 19** - UI library
- **CSS Modules** - Scoped styling
- **TailwindCSS** - Utility-first CSS

### Mobile Platform
- **React Native 0.83** - Mobile UI
- **Expo 55** - Development & build platform
- **Expo Router 55** - File-based navigation
- **NativeWind** - Tailwind CSS for React Native

### State & API
- **Redux Toolkit** - State management
- **Axios** - HTTP client
- **TypeScript** - Type safety

## 📊 Application Flow

### Web
```
[Homepage] 
  ↓ (Search/Filter)
  ↓ (Redux: fetchMovies)
  ↓ (MovieCard Grid)
  ↓ (Click movie)
  ↓ (Redux: fetchMovieDetails)
  ↓ [Movie Details Page]
```

### Mobile  
```
[Movies Screen]
  ↓ (Search/Filter)
  ↓ (Redux: fetchMovies)
  ↓ (FlatList 2-column)
  ↓ (Touch movie)
  ↓ (Redux: fetchMovieDetails)
  ↓ [Movie Details Screen]
```

## 🔧 Development Workflows

### Adding a Feature
1. Add API method in `packages/api`
2. Add Redux slice in `packages/store`
3. Create platform-specific UI in `packages/ui`
4. Integrate in app (`apps/web` or `apps/native`)

### Building for Production

**Web:**
```bash
cd apps/web && yarn build && yarn start
# Deploy to Vercel, Netlify, or self-hosted
```

**Mobile:**
```bash
cd apps/native
eas build --platform ios --release-channel production
eas build --platform android --release-channel production
```

## ♻️ Code Organization

### Shared Code (Packages)
- **API Layer** - Business logic for API interactions
- **State Management** - Redux for app state
- **UI Components** - Reusable, platform-optimized components
- **TypeScript Config** - Consistent type checking

### Platform-Specific Code (Apps)
- **Routes/Navigation** - Different paradigms (Next.js vs Expo Router)
- **Layouts** - Different container strategies
- **Styling** - CSS Modules (web) vs StyleSheet (native)

## 🚨 Performance Considerations

### Metrics
- FCP: < 2s
- LCP: < 2.5s
- CLS: < 0.1
- Mobile: 60fps scrolling

### Implemented Optimizations
- ✅ Component memoization
- ✅ Selector memoization  
- ✅ Callback memoization
- ✅ Image lazy loading
- ✅ Pagination (infinite scroll)
- ✅ StyleSheet API (native)
- ✅ FlatList optimization (native)

## 🔐 Environment Variables

### Web (`apps/web/.env.local`)
```
NEXT_PUBLIC_TMDB_API_KEY=your_api_key
```

### Mobile (`apps/native/.env.local`)
```
EXPO_PUBLIC_TMDB_API_KEY=your_api_key
```

## 🐛 Troubleshooting

### Build Issues
```bash
yarn clean           # Clean all artifacts
yarn install         # Reinstall dependencies
yarn build          # Rebuild everything
```

### API Errors
- Verify API key in `.env.local`
- Check API key is valid at https://www.themoviedb.org/settings/api
- Test with: `curl "https://api.themoviedb.org/3/movie/popular?api_key=YOUR_KEY"`

### Native Build Issues
```bash
cd apps/native
expo start --clear  # Clear Metro bundler cache
watchman watch-del-all  # Reset file watchers
```

## 📈 Future Enhancements

- [ ] User authentication
- [ ] Favorites/watchlist
- [ ] Movie reviews and ratings
- [ ] Social sharing
- [ ] Dark mode
- [ ] Advanced filters
- [ ] Offline support
- [ ] Push notifications
- [ ] Apple TV integration

## 🧪 Testing

```bash
# Unit tests (configure as needed)
yarn test

# E2E tests (configure as needed)
yarn test:e2e

# Type checking
yarn typecheck
```

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Follow the architecture guidelines in ARCHITECTURE.md
2. Use platform-specific components pattern
3. Maintain TypeScript strict mode
4. Add tests for new features
5. Update documentation
6. Run `yarn format` before committing

## 📞 Support & Resources

- **The Movie DB API**: https://www.themoviedb.org/settings/api
- **Turborepo Docs**: https://turbo.build
- **Expo Documentation**: https://docs.expo.dev
- **Redux Toolkit**: https://redux-toolkit.js.org
- **React Native**: https://reactnative.dev
- **Next.js**: https://nextjs.org

## 🎓 Learning Resources

This project demonstrates:
- ✅ Monorepo architecture with Turborepo
- ✅ Code reuse across platforms
- ✅ Redux Toolkit state management
- ✅ Platform-specific component patterns
- ✅ Performance optimization techniques
- ✅ TypeScript best practices
- ✅ File-based routing (web & mobile)
- ✅ Responsive design strategies
- ✅ Error handling and recovery
- ✅ Production-ready patterns

---

**Built with ❤️ for cross-platform development excellence**
