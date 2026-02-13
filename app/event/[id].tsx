import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Share,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { eventService } from "@/services/api";
import { Event } from "@/types/events";

export default function EventDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id && typeof id === "string") {
      fetchEvent();
    }
  }, [id, fetchEvent]);

  const fetchEvent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      if (typeof id === "string") {
        const fetchedEvent = await eventService.getEventById(id);
        setEvent(fetchedEvent);
      }
    } catch (err) {
      setError("Failed to load event details.");
      console.error("Error fetching event:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleShare = async () => {
    if (!event) return;

    try {
      await Share.share({
        message: `Check out "${event.title}" on Sunshade Mobile!\n\nDate: ${new Date(event.dateISO).toLocaleString()}\nLocation: ${event.address}${event.roomNumber ? ` • ${event.roomNumber}` : ""}\n\nJoin us!`,
        title: event.title,
        url: `https://uic.sunshade.app/event/${event.id}`,
      });
    } catch (error) {
      console.error("Share error:", error);
    }
  };

  if (loading) {
    return (
      <ThemedView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      </ThemedView>
    );
  }

  if (error || !event) {
    return (
      <ThemedView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ThemedText style={{ color: colors.tint, fontSize: 16 }}>
              ← Back
            </ThemedText>
          </TouchableOpacity>
        </View>
        <View style={styles.centerContent}>
          <ThemedText style={[styles.errorText, { color: "#EF4444" }]}>
            {error || "Event not found"}
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  const eventDate = new Date(event.dateISO);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ThemedText
            style={{ color: colors.tint, fontSize: 16, fontWeight: "600" }}
          >
            ← Back
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare}>
          <ThemedText
            style={{ color: colors.tint, fontSize: 16, fontWeight: "600" }}
          >
            Share
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Event Title */}
        <View
          style={[styles.titleSection, { borderBottomColor: colors.border }]}
        >
          <ThemedText style={styles.eventTitle}>{event.title}</ThemedText>
          <ThemedText style={[styles.organizer, { color: colors.subtitle }]}>
            Organized by {event.organizer}
          </ThemedText>
        </View>

        {/* Date & Time */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>📅 Date & Time</ThemedText>
          </View>
          <ThemedText
            style={[styles.sectionContent, { color: colors.subtitle }]}
          >
            {formattedDate}
          </ThemedText>
          <ThemedText
            style={[styles.sectionContent, { color: colors.subtitle }]}
          >
            {formattedTime}
          </ThemedText>
        </View>

        {/* Location */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>📍 Location</ThemedText>
          </View>
          <ThemedText
            style={[styles.sectionContent, { color: colors.subtitle }]}
          >
            {event.address}
          </ThemedText>
          {event.roomNumber && (
            <ThemedText
              style={[styles.sectionContent, { color: colors.subtitle }]}
            >
              Room: {event.roomNumber}
            </ThemedText>
          )}
          {event.location && (
            <ThemedText
              style={[styles.coordinates, { color: colors.subtitle }]}
            >
              📌 {event.location.lat.toFixed(4)},{" "}
              {event.location.lng.toFixed(4)}
            </ThemedText>
          )}
        </View>

        {/* Description */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>ℹ️ Details</ThemedText>
          </View>
          <ThemedText
            style={[styles.sectionContent, { color: colors.subtitle }]}
          >
            {event.details}
          </ThemedText>
        </View>

        {/* Extra Info */}
        {event.extraInfo && (
          <View
            style={[
              styles.section,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>✨ Extra Info</ThemedText>
            </View>
            <ThemedText
              style={[styles.sectionContent, { color: colors.subtitle }]}
            >
              {event.extraInfo}
            </ThemedText>
          </View>
        )}

        {/* Attendance */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>👥 Attendance</ThemedText>
          </View>
          <View style={styles.attendanceRow}>
            <View
              style={[
                styles.attendanceBadge,
                { backgroundColor: "rgba(37, 99, 235, 0.1)" },
              ]}
            >
              <ThemedText
                style={[styles.attendanceNumber, { color: "#2563EB" }]}
              >
                {event.attendCount}
              </ThemedText>
              <ThemedText
                style={[styles.attendanceLabel, { color: colors.subtitle }]}
              >
                attendees
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Creator Info */}
        {event.createdByName && (
          <View
            style={[
              styles.section,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>👤 Created By</ThemedText>
            </View>
            <ThemedText
              style={[styles.sectionContent, { color: colors.subtitle }]}
            >
              {event.createdByName}
            </ThemedText>
          </View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
  titleSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  eventTitle: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  organizer: {
    fontSize: 14,
    fontWeight: "500",
  },
  section: {
    marginHorizontal: 12,
    marginVertical: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  sectionHeader: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  coordinates: {
    fontSize: 12,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
  },
  attendanceRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  attendanceBadge: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  attendanceNumber: {
    fontSize: 24,
    fontWeight: "700",
  },
  attendanceLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  bottomPadding: {
    height: 32,
  },
});
