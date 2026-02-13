# 🚀 Sunshade Mobile App - Developer Guide

## Overview

Your Sunshade Mobile app is a production-ready, modern event discovery application for UIC. It features:

- ✨ Clean, modern UI with light/dark mode
- 📱 Native mobile experience (iOS, Android, Web)
- 🔌 Full API integration with `uic.sunshade.app`
- ⚡ Fast, responsive performance
- 🎨 Professional color scheme
- 📚 Complete TypeScript support

## 🎯 Key Screens

### 1. Home Tab - Events List

**File**: `app/(tabs)/index.tsx`

- Displays all upcoming events
- Auto-sorted by date
- Real-time data from API
- Tap to view details

### 2. Event Details

**File**: `app/event/[id].tsx`

- Full event information
- Date, time, location details
- Attendee count
- Share functionality
- GPS coordinates

### 3. Discover Tab - About

**File**: `app/(tabs)/explore.tsx`

- Learn about Sunshade
- Feature highlights
- Getting started guide
- Link to web app

## 📊 Component Hierarchy

```
App (Root)
├── Tabs Navigation
│   ├── Home Tab (index.tsx)
│   │   └── EventCard (event-card.tsx) × N
│   └── Discover Tab (explore.tsx)
│       └── Collapsible Sections
├── Event Detail Screen ([id].tsx)
└── Modal Screen (modal.tsx)
```

## 🎨 Color Palette

The app uses a modern, professional color scheme optimized for both light and dark modes:

**Light Mode**

- Background: #FFFFFF
- Text: #1F2937
- Primary: #2563EB (Blue)
- Accent: #EC4899 (Pink)
- Cards: #F9FAFB
- Borders: #E5E7EB

**Dark Mode**

- Background: #111827
- Text: #F3F4F6
- Primary: #60A5FA (Light Blue)
- Accent: #F472B6 (Light Pink)
- Cards: #1F2937
- Borders: #374151

See `constants/theme.ts` for the complete theme configuration.

## 🔌 API Service

**Location**: `services/api.ts`

The API service provides type-safe access to the Sunshade API:

```typescript
import { eventService } from "@/services/api";

// Fetch all events
const events = await eventService.getAllEvents();

// Get single event details
const event = await eventService.getEventById("event-id");

// Create new event (requires auth token)
await eventService.createEvent(
  {
    title: "Event Title",
    dateISO: "2026-02-15T10:00:00Z",
    location: { lat: 41.8719, lng: -87.6477 },
    uid: "user-id",
    email: "user@uic.edu",
    displayName: "User Name",
    address: "Building Name",
    details: "Event description",
    organizer: "Organization",
  },
  idToken,
);

// RSVP to event
await eventService.rsvpEvent("event-id", "user-id", idToken);
```

## 📦 Project Dependencies

Core packages:

- **react-native**: Native mobile framework
- **expo**: Development and deployment
- **expo-router**: File-based routing
- **@react-navigation**: Navigation library
- **typescript**: Type safety
- **axios**: HTTP requests

Optional (already installed):

- **react-native-maps**: Maps integration
- **react-native-date-picker**: Date selection
- **@react-native-async-storage/async-storage**: Local storage

## 🚀 Development Workflow

### Starting Development

```bash
npm start
# Then press:
# i - iOS simulator
# a - Android emulator
# w - Web browser
```

### Code Quality

```bash
# Lint and fix code issues
npm run lint

# Auto-fix linting issues
npm run lint -- --fix
```

### Project Reset

```bash
# Clear and reset to example structure
npm run reset-project
```

## 📱 Screen Navigation

### Tab Navigation

- Home (index.tsx) - Events list
- Discover (explore.tsx) - About Sunshade

### Stack Navigation

- Event Detail (`/event/[id]`) - Dynamic route for event details
- Modal - Accessible via Link component

## 🔍 File Organization

```
app/                           # Navigation & Routes
├── (tabs)/                   # Tab-based screens
│   ├── _layout.tsx          # Tab configuration
│   ├── index.tsx            # Home/Events list
│   └── explore.tsx          # Discover/About
├── event/
│   └── [id].tsx             # Event detail (dynamic)
├── _layout.tsx              # Root layout
└── modal.tsx                # Modal example

components/                   # Reusable Components
├── event-card.tsx           # Event list item
├── themed-text.tsx          # Theme-aware text
├── themed-view.tsx          # Theme-aware container
├── external-link.tsx        # External links
├── haptic-tab.tsx           # Tab with haptics
├── hello-wave.tsx           # Wave animation
├── parallax-scroll-view.tsx # Parallax effect
└── ui/                      # UI Components
    ├── collapsible.tsx
    ├── icon-symbol.tsx
    └── icon-symbol.ios.tsx

services/                     # API & Services
└── api.ts                   # Event API client

types/                       # TypeScript Types
└── events.ts               # Event interfaces

constants/                   # Configuration
└── theme.ts                # Colors & fonts

hooks/                       # Custom Hooks
├── use-color-scheme.ts     # Dark mode detection
├── use-color-scheme.web.ts # Web-specific
└── use-theme-color.ts      # Theme color hook
```

## 🧪 Testing the App

### Local Testing

1. Start the app: `npm start`
2. Open on simulator/emulator
3. Test event browsing
4. Test event details
5. Test navigation between screens

### API Testing

The API service includes error handling for:

- Network errors
- API failures
- Invalid requests
- Missing authentication

### Dark Mode Testing

- iOS: Settings → Developer → UI Appearance
- Android: Settings → Display → Dark theme
- Web: Browser DevTools

## 🔐 Authentication Setup

To enable protected endpoints (create, update, RSVP):

1. Integrate Firebase Auth or your provider
2. Get ID token from authenticated user
3. Pass to API service:
   ```typescript
   await eventService.createEvent(eventData, userIdToken);
   ```

## 🚢 Deployment

### Prepare for Production

1. Update API endpoint if needed in `services/api.ts`
2. Update app.json with production bundle IDs
3. Generate app icon and splash screen
4. Configure Firebase Storage CORS for image uploads

### Build Commands

```bash
# iOS
eas build --platform ios

# Android
eas build --platform android

# Web (static export)
expo export --platform web
```

## 📈 Performance Tips

- Events are sorted by date automatically
- Loading states prevent UI freezing
- Error handling provides user feedback
- Scrolling is optimized with `bounces` and `scrollEventThrottle`
- Images use Expo's optimized `Image` component

## 🎓 Learning Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Expo Router Guide](https://docs.expo.dev/router/introduction)

## 💡 Common Customizations

### Change API Endpoint

```typescript
// In services/api.ts
const API_BASE_URL = "https://your-api.com/api";
```

### Change Colors

```typescript
// In constants/theme.ts
const primaryLight = "#YOUR_COLOR";
```

### Add New Screen

1. Create file in `app/` or `app/(tabs)/`
2. Use `useRouter()` for navigation
3. Export default component

### Add New Component

1. Create in `components/`
2. Use `ThemedText` and `ThemedView` for theming
3. Export as named export

## ✅ Quality Checklist

- [x] TypeScript throughout
- [x] ESLint passing
- [x] Dark mode support
- [x] Error handling
- [x] Loading states
- [x] Responsive design
- [x] API integration
- [x] Clean code structure

## 📞 Troubleshooting

**App won't start?**

- Run `npm install` to ensure dependencies
- Clear cache: `expo start --clear`

**API calls failing?**

- Check internet connection
- Verify API endpoint URL
- Check API response in browser

**Styling looks wrong?**

- Ensure device/system dark mode setting matches
- Check `Colors` constant in `theme.ts`

**Build errors?**

- Clear `node_modules` and reinstall
- Check Node.js version (v18+ required)

---

**Ready to develop! 🎉**

For questions or issues, check the comprehensive README.md file.
