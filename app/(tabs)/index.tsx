import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";

import { EventCard } from "@/components/event-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { eventService } from "@/services/api";
import { Event } from "@/types/events";

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedEvents = await eventService.getAllEvents();
      // Sort events by date (upcoming first)
      const sortedEvents = fetchedEvents.sort(
        (a, b) => new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime(),
      );
      setEvents(sortedEvents);
    } catch (err) {
      setError("Failed to load events. Please try again.");
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <ThemedText style={styles.title}>📅 Events</ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.subtitle }]}>
          UIC Sunshade
        </ThemedText>
      </View>

      {loading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={colors.tint} />
          <ThemedText style={[styles.loadingText, { marginTop: 12 }]}>
            Loading events...
          </ThemedText>
        </View>
      ) : error ? (
        <View style={styles.centerContent}>
          <ThemedText
            style={[styles.errorText, { color: "#EF4444", marginBottom: 16 }]}
          >
            {error}
          </ThemedText>
          <ThemedText
            style={[styles.retryButton, { color: colors.tint }]}
            onPress={fetchEvents}
          >
            Tap to retry
          </ThemedText>
        </View>
      ) : events.length === 0 ? (
        <View style={styles.centerContent}>
          <ThemedText style={[styles.emptyText, { color: colors.subtitle }]}>
            No events found
          </ThemedText>
        </View>
      ) : (
        <ScrollView
          style={styles.eventsList}
          showsVerticalScrollIndicator={true}
          scrollEventThrottle={16}
          bounces={true}
        >
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() => router.push(`/event/${event.id}`)}
            />
          ))}
          <View style={styles.bottomPadding} />
        </ScrollView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: "500",
  },
  errorText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  retryButton: {
    fontSize: 14,
    fontWeight: "600",
    padding: 12,
    borderRadius: 8,
  },
  emptyText: {
    fontSize: 16,
  },
  eventsList: {
    flex: 1,
  },
  bottomPadding: {
    height: 32,
  },
});
