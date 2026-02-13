# 📱 Sunshade Mobile

A clean, modern mobile app for discovering and managing events at UIC (University of Illinois at Chicago). Built with React Native and Expo, Sunshade Mobile provides seamless access to all campus events with an intuitive, user-friendly interface.

## ✨ Features

- **Browse Events**: View all upcoming campus events with real-time updates
- **Event Details**: See comprehensive event information including:
  - Date and time
  - Location and room number
  - Event organizer and description
  - Attendee count
  - Event coordinates (GPS)
- **Share Events**: Easily share events with friends via text, email, or social media
- **Clean Design**: Beautiful, modern UI with light and dark mode support
- **Fast Performance**: Optimized for quick loading and smooth navigation
- **Mobile-First**: Native mobile experience for iOS and Android

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd sunshade-mobile
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open on your device:**
   - **iOS**: Press `i` to open in iOS simulator
   - **Android**: Press `a` to open in Android emulator
   - **Web**: Press `w` to open in web browser

## 📁 Project Structure

```
sunshade-mobile/
├── app/                          # Main application routes
│   ├── _layout.tsx              # Root navigation layout
│   ├── modal.tsx                # Modal screen template
│   ├── (tabs)/                  # Tab-based navigation
│   │   ├── _layout.tsx          # Tab layout
│   │   ├── index.tsx            # Home - Events list
│   │   └── explore.tsx          # Discover - About Sunshade
│   └── event/
│       └── [id].tsx             # Event detail screen
├── components/                   # Reusable UI components
│   ├── event-card.tsx           # Event list item component
│   ├── themed-text.tsx          # Themed text component
│   ├── themed-view.tsx          # Themed view component
│   ├── external-link.tsx        # External link handler
│   └── ui/                      # UI component library
├── services/
│   └── api.ts                   # API service for Sunshade backend
├── types/
│   └── events.ts                # TypeScript event types
├── constants/
│   └── theme.ts                 # Color palette and fonts
├── hooks/
│   ├── use-color-scheme.ts      # Dark mode detection
│   ├── use-color-scheme.web.ts  # Web-specific color scheme
│   └── use-theme-color.ts       # Theme color hook
└── package.json
```

## 🎨 Theme & Styling

The app features a modern color palette with full dark mode support:

- **Primary**: Blue (`#2563EB`)
- **Accent**: Pink (`#EC4899`)
- **Background**: White (`#FFFFFF`) / Dark Gray (`#111827`)
- **Text**: Dark Gray (`#1F2937`) / Light Gray (`#F3F4F6`)

All components automatically adapt to light and dark modes using the `useColorScheme()` hook.

## 🔌 API Integration

The app connects to the Sunshade API (`https://uic.sunshade.app/api`) for:

- **GET /events** - Fetch all events
- **GET /events/{id}** - Get event details
- **POST /events** - Create new event
- **PATCH /events/{id}** - Update event
- **POST /events/{id}/rsvp** - RSVP to event

Detailed API documentation is available in [docs/API.md](docs/API.md).

## 📚 API Service

The `services/api.ts` module provides convenient methods:

```typescript
import { eventService } from '@/services/api';

// Get all events
const events = await eventService.getAllEvents();

// Get single event
const event = await eventService.getEventById(eventId);

// Create event (requires auth token)
const newEvent = await eventService.createEvent(eventData, idToken);

// RSVP to event
await eventService.rsvpEvent(eventId, userId, idToken);
```

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router
- **HTTP Client**: Axios
- **Icons**: Expo Vector Icons
- **Animations**: React Native Reanimated
- **Storage**: AsyncStorage

## 📱 Supported Platforms

- iOS 13+
- Android 6.0+
- Web (responsive design)

## 🧪 Development

### Run Linter
```bash
npm run lint
```

### Run Tests
```bash
npm test
```

### Reset Project
Restore the original example structure:
```bash
npm run reset-project
```

## 🚢 Building for Production

### iOS
```bash
eas build --platform ios
```

### Android
```bash
eas build --platform android
```

### Web
```bash
npm run web
```

Then build for static hosting:
```bash
expo export --platform web
```

## 📝 Environment Setup

1. Ensure your API endpoint in `services/api.ts` points to your deployment:
   ```typescript
   const API_BASE_URL = 'https://uic.sunshade.app/api';
   ```

2. For image uploads, configure Firebase Storage CORS as documented in [docs/STORAGE-CORS.md](docs/STORAGE-CORS.md)

## 🔐 Authentication

The app supports authentication via bearer tokens for protected endpoints:

```typescript
const response = await eventService.createEvent(eventData, idToken);
```

Integrate with Firebase Authentication or your preferred auth provider.

## 🐛 Troubleshooting

**Events not loading?**
- Check your internet connection
- Verify the API endpoint is correct
- Check browser console for network errors

**Dark mode not working?**
- Ensure your device/system has dark mode enabled
- Check the `useColorScheme()` hook implementation

**Build errors?**
- Run `npm install` to ensure all dependencies are installed
- Clear cache: `expo start --clear`
- Check Node.js version: `node --version` (requires v18+)

## 📄 License

This project is part of the UIC Sunshade platform.

## 🤝 Contributing

To contribute to the Sunshade Mobile app:

1. Create a feature branch
2. Make your changes
3. Run linter: `npm run lint`
4. Submit a pull request

## 📞 Support

For issues or questions about the Sunshade platform, visit:
- Website: https://uic.sunshade.app
- GitHub: [sunshade repository]

---

**Built with ❤️ for the UIC community**
