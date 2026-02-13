import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Event } from "@/types/events";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const eventDate = new Date(event.dateISO);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <ThemedView
        style={[
          styles.container,
          { borderColor: colors.border, backgroundColor: colors.card },
        ]}
      >
        <View style={styles.header}>
          <View style={styles.dateContainer}>
            <ThemedText style={styles.dateText}>{formattedDate}</ThemedText>
            <ThemedText style={[styles.timeText, { color: colors.subtitle }]}>
              {formattedTime}
            </ThemedText>
          </View>

          <View style={styles.titleContainer}>
            <ThemedText style={styles.title} numberOfLines={2}>
              {event.title}
            </ThemedText>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.organizerContainer}>
            <ThemedText style={[styles.label, { color: colors.subtitle }]}>
              {event.organizer}
            </ThemedText>
          </View>
          <View style={styles.locationContainer}>
            <ThemedText
              style={[styles.location, { color: colors.subtitle }]}
              numberOfLines={1}
            >
              📍 {event.address}
              {event.roomNumber ? ` • ${event.roomNumber}` : ""}
            </ThemedText>
          </View>
          <View style={styles.attendeeContainer}>
            <ThemedText
              style={[styles.attendeeText, { color: colors.subtitle }]}
            >
              👥 {event.attendCount} attendee
              {event.attendCount !== 1 ? "s" : ""}
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 10,
  },
  dateContainer: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "rgba(37, 99, 235, 0.1)",
    minWidth: 60,
    alignItems: "center",
  },
  dateText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2563EB",
  },
  timeText: {
    fontSize: 10,
    marginTop: 2,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 2,
  },
  footer: {
    gap: 6,
  },
  organizerContainer: {
    marginBottom: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
  },
  locationContainer: {
    marginVertical: 2,
  },
  location: {
    fontSize: 12,
  },
  attendeeContainer: {},
  attendeeText: {
    fontSize: 12,
  },
});
