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
  reducer: { movies: moviesReducer },
});
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

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support & Resources

- **The Movie DB API**: https://www.themoviedb.org/settings/api
- **Turborepo Docs**: https://turbo.build
- **Expo Documentation**: https://docs.expo.dev
- **Redux Toolkit**: https://redux-toolkit.js.org
- **React Native**: https://reactnative.dev
- **Next.js**: https://nextjs.org

---

**Built with ❤️ for cross-platform development excellence**
