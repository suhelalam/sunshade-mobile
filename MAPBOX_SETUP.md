# 🗺️ Mapbox Setup Guide

Your Sunshade Mobile app now includes **Mapbox** integration for displaying event locations on an interactive map!

## 🔑 Getting Your Mapbox Access Token

### Step 1: Create a Mapbox Account
1. Go to [Mapbox.com](https://www.mapbox.com/)
2. Click "Sign up"
3. Create your free account

### Step 2: Get Your Access Token
1. Go to [Mapbox Account Dashboard](https://account.mapbox.com/)
2. Navigate to **Tokens** section
3. Click **Create a token**
4. Configure:
   - **Name**: "Sunshade Mobile"
   - **Scopes**: Select "Maps:Read"
   - Click **Create token**
5. Copy the token (looks like: `pk.eyJ...`)

### Step 3: Add Token to Your App

Update `services/firebase.ts` with your token:

```typescript
// In services/firebase.ts, replace the setAccessToken call:
MapboxGL.setAccessToken('YOUR_MAPBOX_TOKEN_HERE');
```

Or create a `.env` file:

```
EXPO_PUBLIC_MAPBOX_TOKEN=your_token_here
```

Then use it:

```typescript
MapboxGL.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN || '');
```

## 🗺️ Map Features

### On Home Screen
- **Interactive Map**: Shows all event locations
- **Map Markers**: Blue dots for events, pink when selected
- **Auto-center**: Map automatically centers on all events
- **Event Counter**: Shows total events found
- **Scrollable List**: See all events below the map

### Map Interaction
- **Drag**: Move around the map
- **Pinch**: Zoom in/out
- **Tap Marker**: Select an event on the map
- **Tap Event Card**: Navigate to event details

## 🎯 How It Works

1. **Fetch Events**: App loads all events from Firestore
2. **Show Map**: Interactive map displays event markers
3. **Display Locations**: Each event has a blue marker pin
4. **List Events**: Scrollable list of all events below map
5. **Link Map to List**: Selecting on map highlights event

## 📍 Firestore Event Structure

Ensure your Firestore events have location data:

```json
{
  "location": {
    "lat": 41.8719,
    "lng": -87.6477
  },
  "address": "Building Name",
  "title": "Event Title",
  ...
}
```

## 🚀 Testing

### With Sample Data
1. Add events to Firestore with valid coordinates
2. Run: `npm start`
3. Press `i`, `a`, or `w`
4. Map will show all event markers

### Sample Events to Add to Firestore

```json
{
  "title": "Career Fair",
  "location": { "lat": 41.8719, "lng": -87.6477 },
  "address": "Student Center",
  "dateISO": "2026-02-20T14:00:00Z",
  "organizer": "Career Services",
  "details": "Meet with top companies",
  "attendCount": 50,
  "createdByName": "Admin",
  "createdBy": "admin"
}
```

## 🎨 Customizing Map

Edit `components/map-view.tsx`:

```typescript
// Change default zoom level
zoomLevel={15}  // Lower = more zoomed out, higher = more zoomed in

// Change marker colors
backgroundColor: '#2563EB'  // Primary color
backgroundColor: '#EC4899'  // Selected color

// Change map style
MapboxGL.StyleURL.Street    // Street view
MapboxGL.StyleURL.Light     // Light theme
MapboxGL.StyleURL.Dark      // Dark theme
MapboxGL.StyleURL.Satellite // Satellite view
```

## 🛠️ Advanced Features

### Real-time Location
To show user's current location on map:

```typescript
import * as Location from 'expo-location';

const [userLocation, setUserLocation] = useState(null);

useEffect(() => {
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location.coords);
  })();
}, []);
```

### Clustering
For many events, add clustering:

```typescript
MapboxGL.ShapeSource
  clusteringEnabled={true}
  clusterMaxZoomLevel={14}
```

### Custom Styles
Create a custom Mapbox style:
1. Go to [Mapbox Studio](https://studio.mapbox.com/)
2. Create/edit a style
3. Get the style URL
4. Update in map component

## ⚠️ Common Issues

**Map Not Showing?**
- Check Mapbox token is set correctly
- Verify token has Maps:Read scope
- Check Firebase events have location data

**Markers Not Visible?**
- Ensure event objects have `location` property
- Check lat/lng values are valid coordinates
- Verify Firebase data structure

**Performance Slow?**
- Limit events displayed (fetch only nearby events)
- Use clustering for many markers
- Reduce map refresh rate

## 📱 Supported Platforms

- ✅ iOS
- ✅ Android
- ✅ Web (uses different library)

## 📚 Resources

- [Mapbox Documentation](https://docs.mapbox.com/)
- [React Native Mapbox GL](https://rnmapbox.github.io/)
- [Mapbox API Reference](https://docs.mapbox.com/api/)

## ✅ Next Steps

1. Get your Mapbox token
2. Add it to `services/firebase.ts`
3. Add events to Firestore
4. Run `npm start`
5. See your events on the map!

---

**Your map is ready to use! 🗺️**

For more help, check Mapbox documentation or Firebase Console.
