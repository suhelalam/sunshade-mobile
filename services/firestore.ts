import { CreateEventPayload, Event, Location } from "@/types/events";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    Timestamp,
    updateDoc,
    where,
} from "firebase/firestore";
import { db } from "./firebase";

export const firebaseEventService = {
  /**
   * Get all events from Firestore
   */
  async getAllEvents(): Promise<Event[]> {
    try {
      const eventsRef = collection(db, "events");
      const q = query(eventsRef, orderBy("dateISO", "asc"));
      const querySnapshot = await getDocs(q);

      const events: Event[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        events.push({
          id: doc.id,
          title: data.title || "",
          dateISO:
            data.dateISO instanceof Timestamp
              ? data.dateISO.toDate().toISOString()
              : data.dateISO,
          location: data.location as Location,
          address: data.address || "",
          roomNumber: data.roomNumber,
          imageUrl: data.imageUrl,
          creatorPhotoUrl: data.creatorPhotoUrl,
          details: data.details || "",
          extraInfo: data.extraInfo,
          organizer: data.organizer || "",
          createdBy: data.createdBy || "",
          createdByName: data.createdByName || "",
          attendCount: data.attendCount || 0,
          attendees: data.attendees || {},
        });
      });

      return events;
    } catch (error) {
      console.error("Error fetching events from Firestore:", error);
      throw error;
    }
  },

  /**
   * Get a single event by ID
   */
  async getEventById(id: string): Promise<Event> {
    try {
      const eventRef = doc(db, "events", id);
      const eventSnap = await getDoc(eventRef);

      if (!eventSnap.exists()) {
        throw new Error("Event not found");
      }

      const data = eventSnap.data();
      return {
        id: eventSnap.id,
        title: data.title || "",
        dateISO:
          data.dateISO instanceof Timestamp
            ? data.dateISO.toDate().toISOString()
            : data.dateISO,
        location: data.location as Location,
        address: data.address || "",
        roomNumber: data.roomNumber,
        imageUrl: data.imageUrl,
        creatorPhotoUrl: data.creatorPhotoUrl,
        details: data.details || "",
        extraInfo: data.extraInfo,
        organizer: data.organizer || "",
        createdBy: data.createdBy || "",
        createdByName: data.createdByName || "",
        attendCount: data.attendCount || 0,
        attendees: data.attendees || {},
      };
    } catch (error) {
      console.error(`Error fetching event ${id} from Firestore:`, error);
      throw error;
    }
  },

  /**
   * Create a new event
   */
  async createEvent(payload: CreateEventPayload): Promise<{ id: string }> {
    try {
      const eventsRef = collection(db, "events");
      const docRef = await addDoc(eventsRef, {
        title: payload.title,
        dateISO: new Date(payload.dateISO),
        location: payload.location,
        address: payload.address,
        roomNumber: payload.roomNumber,
        imageUrl: payload.imageUrl,
        details: payload.details,
        extraInfo: payload.extraInfo,
        organizer: payload.organizer,
        createdBy: payload.uid,
        createdByName: payload.displayName,
        creatorPhotoUrl: payload.photoURL,
        attendCount: 1,
        attendees: {
          [payload.uid]: Date.now(),
        },
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      return { id: docRef.id };
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  },

  /**
   * Update an event
   */
  async updateEvent(
    id: string,
    updates: Partial<Event>,
  ): Promise<{ message: string }> {
    try {
      const eventRef = doc(db, "events", id);
      const updateData: Record<string, any> = {
        ...updates,
        updatedAt: Timestamp.now(),
      };

      // Handle dateISO - convert to Date if it's a string
      if (updateData.dateISO && typeof updateData.dateISO === "string") {
        updateData.dateISO = new Date(updateData.dateISO);
      }

      await updateDoc(eventRef, updateData);
      return { message: "Event updated successfully" };
    } catch (error) {
      console.error(`Error updating event ${id}:`, error);
      throw error;
    }
  },

  /**
   * RSVP to an event (add user to attendees)
   */
  async rsvpEvent(id: string, userId: string): Promise<{ message: string }> {
    try {
      const eventRef = doc(db, "events", id);
      const eventSnap = await getDoc(eventRef);

      if (!eventSnap.exists()) {
        throw new Error("Event not found");
      }

      const data = eventSnap.data();
      const attendees = data.attendees || {};

      // Add user if not already attending
      if (!attendees[userId]) {
        attendees[userId] = Date.now();
        await updateDoc(eventRef, {
          attendees,
          attendCount: (data.attendCount || 0) + 1,
          updatedAt: Timestamp.now(),
        });
      }

      return { message: "RSVP successful" };
    } catch (error) {
      console.error(`Error RSVP to event ${id}:`, error);
      throw error;
    }
  },

  /**
   * Search events by keyword
   */
  async searchEvents(searchTerm: string): Promise<Event[]> {
    try {
      const allEvents = await this.getAllEvents();
      const lowerSearchTerm = searchTerm.toLowerCase();

      return allEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(lowerSearchTerm) ||
          event.details.toLowerCase().includes(lowerSearchTerm) ||
          event.organizer.toLowerCase().includes(lowerSearchTerm) ||
          event.address.toLowerCase().includes(lowerSearchTerm),
      );
    } catch (error) {
      console.error("Error searching events:", error);
      throw error;
    }
  },

  /**
   * Get events by organizer
   */
  async getEventsByOrganizer(organizer: string): Promise<Event[]> {
    try {
      const eventsRef = collection(db, "events");
      const q = query(
        eventsRef,
        where("organizer", "==", organizer),
        orderBy("dateISO", "asc"),
      );
      const querySnapshot = await getDocs(q);

      const events: Event[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        events.push({
          id: doc.id,
          title: data.title || "",
          dateISO:
            data.dateISO instanceof Timestamp
              ? data.dateISO.toDate().toISOString()
              : data.dateISO,
          location: data.location as Location,
          address: data.address || "",
          roomNumber: data.roomNumber,
          imageUrl: data.imageUrl,
          creatorPhotoUrl: data.creatorPhotoUrl,
          details: data.details || "",
          extraInfo: data.extraInfo,
          organizer: data.organizer || "",
          createdBy: data.createdBy || "",
          createdByName: data.createdByName || "",
          attendCount: data.attendCount || 0,
          attendees: data.attendees || {},
        });
      });

      return events;
    } catch (error) {
      console.error("Error fetching events by organizer:", error);
      throw error;
    }
  },
};

export default firebaseEventService;
