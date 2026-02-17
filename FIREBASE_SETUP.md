# 🔥 Firebase Setup Guide

Your Sunshade Mobile app is now configured to use **Firebase Firestore** for real-time event data management!

## ✅ What's Configured

- **Firebase Project**: sunshade-cb8bb
- **Firestore Database**: Real-time event storage
- **Firebase Authentication**: User authentication ready
- **Firebase Storage**: Image uploads support

## 📊 Firestore Collection Structure

Create a **`events`** collection in Firestore with this structure:

```javascript
{
  id: "auto-generated",
  title: "Event Title",
  dateISO: Timestamp,  // Date object
  location: {
    lat: 41.8719,
    lng: -87.6477
  },
  address: "Building Name",
  roomNumber: "201",
  imageUrl: "https://...",
  creatorPhotoUrl: "https://...",
  details: "Event description",
  extraInfo: "Additional info",
  organizer: "Organization Name",
  createdBy: "user-uid",
  createdByName: "User Name",
  attendCount: 5,
  attendees: {
    "user-id-1": 1707817200000,
    "user-id-2": 1707817300000
  },
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## 🚀 Setting Up Firestore

### Step 1: Go to Firebase Console

https://console.firebase.google.com/

### Step 2: Create Collections

1. Select your project: **sunshade-cb8bb**
2. Go to **Firestore Database**
3. Click **Create Collection**
4. Name it: `events`
5. Add a test document

### Step 3: Set Security Rules

Go to **Firestore** → **Rules** and set:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /events/{document=**} {
      allow read: if true;  // Anyone can read events
      allow create, update, delete: if request.auth != null;  // Only authenticated users can create/edit
    }
  }
}
```

### Step 4: Test with Sample Data

Create a document in the `events` collection:

```json
{
  "title": "UIC Career Fair 2026",
  "dateISO": "2026-02-20T14:00:00Z",
  "location": {
    "lat": 41.8719,
    "lng": -87.6477
  },
  "address": "Student Center",
  "roomNumber": "201",
  "details": "Meet with top companies recruiting at UIC",
  "organizer": "Career Services",
  "createdBy": "admin",
  "createdByName": "Admin User",
  "attendCount": 42,
  "attendees": {},
  "createdAt": "2026-02-13T00:00:00Z",
  "updatedAt": "2026-02-13T00:00:00Z"
}
```

## 🔐 Firebase Services Available

### 1. Get All Events

```typescript
import { firebaseEventService } from "@/services/firestore";

const events = await firebaseEventService.getAllEvents();
```

### 2. Get Single Event

```typescript
const event = await firebaseEventService.getEventById("event-id");
```

### 3. Create Event

```typescript
const result = await firebaseEventService.createEvent({
  title: "New Event",
  dateISO: "2026-02-20T14:00:00Z",
  location: { lat: 41.8719, lng: -87.6477 },
  uid: "user-id",
  displayName: "User Name",
  photoURL: "https://...",
  address: "Location",
  details: "Description",
  organizer: "Org Name",
});
```

### 4. Update Event

```typescript
await firebaseEventService.updateEvent("event-id", {
  title: "Updated Title",
  attendCount: 50,
});
```

### 5. RSVP to Event

```typescript
await firebaseEventService.rsvpEvent("event-id", "user-id");
```

### 6. Search Events

```typescript
const results = await firebaseEventService.searchEvents("career");
```

### 7. Get Events by Organizer

```typescript
const events =
  await firebaseEventService.getEventsByOrganizer("Career Services");
```

## 📱 Using in Components

All screens are already updated to use Firebase:

```typescript
// Home Screen - Displays all events
const events = await firebaseEventService.getAllEvents();

// Event Detail Screen - Shows single event
const event = await firebaseEventService.getEventById(id);

// Auto real-time updates
```

## 🔄 Real-Time Updates (Optional)

To add real-time listeners instead of one-time fetches:

```typescript
import { onSnapshot } from "firebase/firestore";

const unsubscribe = onSnapshot(
  query(collection(db, "events"), orderBy("dateISO")),
  (snapshot) => {
    const events = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setEvents(events);
  },
);
```

## 🛡️ Authentication (Optional)

Add Firebase Authentication:

```typescript
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/services/firebase";

// Sign up
const userCredential = await createUserWithEmailAndPassword(
  auth,
  email,
  password,
);

// Sign in
const userCredential = await signInWithEmailAndPassword(auth, email, password);

// Get current user
const user = auth.currentUser;
```

## 📤 Image Upload to Storage

```typescript
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "@/services/firebase";

const imageRef = ref(storage, `events/${eventId}/image.jpg`);
await uploadBytes(imageRef, imageBlob);
```

## ✅ Verify Setup

1. Start the app: `npm start`
2. Press `i` or `a` or `w` to run
3. App should display Firebase events from Firestore
4. Check Firebase Console → **Firestore** for data reads

## 🐛 Troubleshooting

**No events showing?**

- Check Firebase Console → Firestore
- Verify collection name is `events`
- Check security rules allow reads
- Review console errors in app

**CORS errors?**

- Firebase handles this automatically
- No additional CORS config needed

**Real-time updates not working?**

- Ensure Firestore connection is active
- Check internet connection
- Review Firebase security rules

## 📚 Files Updated

- ✅ `services/firebase.ts` - Firebase initialization
- ✅ `services/firestore.ts` - Firestore event service
- ✅ `app/(tabs)/index.tsx` - Uses Firebase
- ✅ `app/event/[id].tsx` - Uses Firebase
- ✅ All screens connected to Firestore

## 🎉 You're All Set!

Your app is now powered by Firebase! Run `npm start` and enjoy real-time event management.

For more info: [Firebase Documentation](https://firebase.google.com/docs)
