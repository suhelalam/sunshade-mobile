export interface Location {
  lng: number;
  lat: number;
}

export interface Event {
  id: string;
  title: string;
  dateISO: string;
  location: Location;
  address: string;
  roomNumber?: string;
  imageUrl?: string;
  creatorPhotoUrl?: string;
  details: string;
  extraInfo?: string;
  organizer: string;
  createdBy: string;
  createdByName: string;
  attendCount: number;
  attendees?: Record<string, number>;
}

export interface CreateEventPayload {
  title: string;
  dateISO: string;
  location: Location;
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  address: string;
  roomNumber?: string;
  imageUrl?: string;
  details: string;
  extraInfo?: string;
  organizer: string;
}
