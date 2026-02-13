import { CreateEventPayload, Event } from "@/types/events";
import axios, { AxiosInstance } from "axios";

const API_BASE_URL = "https://uic.sunshade.app/api";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const eventService = {
  /**
   * Get all events
   */
  async getAllEvents(): Promise<Event[]> {
    try {
      const response = await apiClient.get<{ events: Event[] }>("/events");
      return response.data.events || [];
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  },

  /**
   * Get a single event by ID
   */
  async getEventById(id: string): Promise<Event> {
    try {
      const response = await apiClient.get<Event>(`/events/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching event ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new event (requires authentication token)
   */
  async createEvent(
    payload: CreateEventPayload,
    idToken: string,
  ): Promise<{ id: string }> {
    try {
      const response = await apiClient.post<{ id: string; message: string }>(
        "/events",
        payload,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      );
      return { id: response.data.id };
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  },

  /**
   * Update an event (requires authentication token)
   */
  async updateEvent(
    id: string,
    updates: Partial<Event>,
    idToken: string,
  ): Promise<{ message: string }> {
    try {
      const response = await apiClient.patch<{ message: string }>(
        `/events/${id}`,
        updates,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating event ${id}:`, error);
      throw error;
    }
  },

  /**
   * RSVP to an event (add user to attendees)
   */
  async rsvpEvent(
    id: string,
    userId: string,
    idToken: string,
  ): Promise<{ message: string }> {
    try {
      const response = await apiClient.post<{ message: string }>(
        `/events/${id}/rsvp`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error(`Error RSVP to event ${id}:`, error);
      throw error;
    }
  },
};

export default apiClient;
