import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { EventCard } from "@/components/event-card";
import { MapView } from "@/components/map-view";
import { firebaseEventService } from "@/services/firestore";
import { Event } from "@/types/events";

type ActiveTab = "map" | "feed";

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("map");

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedEvents = await firebaseEventService.getAllEvents();
      setEvents(fetchedEvents);
      setSelectedEventId((prev) => prev ?? fetchedEvents[0]?.id ?? null);
    } catch (err) {
      setError("Failed to load events. Please try again.");
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const selectedEvent = useMemo(
    () => events.find((event) => event.id === selectedEventId) ?? events[0],
    [events, selectedEventId]
  );

  const todayCount = useMemo(() => {
    const today = new Date().toDateString();
    return events.filter(
      (event) => new Date(event.dateISO).toDateString() === today
    ).length;
  }, [events]);

  const coordinateText = selectedEvent?.location
    ? `${selectedEvent.location.lat.toFixed(5)}, ${selectedEvent.location.lng.toFixed(5)}`
    : "41.87190, -87.64770";

  if (loading) {
    return (
      <View style={[styles.centerContent, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Loading events...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centerContent, { paddingTop: insets.top }]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchEvents} style={styles.retryButton}>
          <Text style={styles.retryText}>Tap to retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.contentWrap}>
      <View style={[styles.topPanel, { paddingTop: Math.max(insets.top, 14) }]}>
        <View style={styles.topRow}>
          <View style={styles.brandBlock}>
            <Text style={styles.brandTitle}>S...</Text>
            <Text style={styles.brandSubtitle}>Campus{"\n"}events{"\n"}& feed</Text>
          </View>

          <View style={styles.actionsBlock}>
            <View style={styles.segmentControl}>
              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  activeTab === "map" && styles.segmentButtonActive,
                ]}
                onPress={() => setActiveTab("map")}
              >
                <Text
                  style={[
                    styles.segmentLabel,
                    activeTab === "map" && styles.segmentLabelActive,
                  ]}
                >
                  Map
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  activeTab === "feed" && styles.segmentButtonActive,
                ]}
                onPress={() => setActiveTab("feed")}
              >
                <Text
                  style={[
                    styles.segmentLabel,
                    activeTab === "feed" && styles.segmentLabelActive,
                  ]}
                >
                  Feed
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.signInButton}>
              <Text style={styles.signInText}>🔔 Sign in with Google</Text>
            </TouchableOpacity>
            <Text style={styles.signInMeta}>UIC email (@uic.edu) required</Text>
          </View>
        </View>
      </View>

      <View style={styles.redDivider} />

      {activeTab === "map" ? (
        <View style={styles.mapSection}>
          <MapView
            events={events}
            selectedEventId={selectedEventId ?? undefined}
            onEventSelect={setSelectedEventId}
            containerStyle={styles.mapCanvas}
          />

          <View style={styles.searchOverlay}>
            <Text style={styles.searchIcon}>⌕</Text>
            <Text style={styles.searchText}>Search an address...</Text>
          </View>

          <TouchableOpacity style={styles.eventsOverlay}>
            <Text style={styles.eventsOverlayText}>☰ Events ({events.length})</Text>
          </TouchableOpacity>

          <View style={styles.rightOverlay}>
            <Text style={styles.rightOverlayIcon}>🗺</Text>
            <Text style={styles.rightOverlayIcon}>⌄</Text>
            <Text style={styles.rightOverlayIcon}>📍</Text>
          </View>

          <View style={styles.bottomBar}>
            <Text style={styles.bottomBarLeft}>{coordinateText}</Text>
            <Text style={styles.bottomBarRight}>
              {events.length} event(s) · {todayCount} today
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.feedSection}>
          <Text style={styles.feedTitle}>Events ({events.length})</Text>
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() => {
                setSelectedEventId(event.id);
                router.push(`/event/${event.id}`);
              }}
            />
          ))}
        </View>
      )}

      <View style={styles.redDivider} />

      <View style={styles.footer}>
        <Text style={styles.footerHeading}>SUNSHADE</Text>
        <Text style={styles.footerBody}>
          Campus event map for the University of Illinois Chicago.
        </Text>

        <Text style={styles.footerHeading}>UNIVERSITY OF ILLINOIS CHICAGO</Text>
        <Text style={styles.footerBody}>
          1200 West Harrison Street{"\n"}Chicago, Illinois 60607
        </Text>

        <Text style={styles.footerCopyright}>
          © 2026 The Board of Trustees of the University of Illinois.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#001F74",
  },
  contentWrap: {
    paddingBottom: 36,
  },
  topPanel: {
    paddingHorizontal: 18,
    paddingBottom: 18,
    backgroundColor: "#001F74",
  },
  topRow: {
    flexDirection: "row",
    gap: 12,
  },
  brandBlock: {
    width: 64,
    paddingTop: 2,
  },
  brandTitle: {
    color: "#F5F8FF",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
  },
  brandSubtitle: {
    color: "#C4D1F3",
    fontSize: 14,
    lineHeight: 20,
  },
  actionsBlock: {
    flex: 1,
    gap: 10,
  },
  segmentControl: {
    flexDirection: "row",
    backgroundColor: "#1F3A86",
    borderRadius: 16,
    padding: 4,
    alignSelf: "flex-start",
  },
  segmentButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  segmentButtonActive: {
    backgroundColor: "#EEF1F7",
  },
  segmentLabel: {
    color: "#D7E1FA",
    fontSize: 17,
    fontWeight: "700",
  },
  segmentLabelActive: {
    color: "#001F74",
  },
  signInButton: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  signInText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  signInMeta: {
    color: "#BFCDF3",
    fontSize: 14,
  },
  redDivider: {
    height: 3,
    backgroundColor: "#E30B56",
  },
  mapSection: {
    height: 740,
    position: "relative",
  },
  mapCanvas: {
    flex: 1,
  },
  searchOverlay: {
    position: "absolute",
    top: 20,
    left: 16,
    right: 16,
    backgroundColor: "#ECECEC",
    borderRadius: 16,
    borderWidth: 6,
    borderColor: "#DFDFDF",
    height: 84,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 22,
  },
  searchIcon: {
    color: "#7F7F7F",
    fontSize: 26,
    marginRight: 14,
  },
  searchText: {
    color: "#8D8D8D",
    fontSize: 46 / 2,
    fontWeight: "500",
  },
  eventsOverlay: {
    position: "absolute",
    left: 20,
    bottom: 150,
    backgroundColor: "#F2F2F2",
    borderColor: "#D9DDE7",
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 22,
  },
  eventsOverlayText: {
    color: "#001F74",
    fontSize: 38 / 2,
    fontWeight: "700",
  },
  rightOverlay: {
    position: "absolute",
    right: 16,
    bottom: 106,
    width: 92,
    height: 200,
    borderRadius: 18,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 1,
    borderColor: "#D9DDE7",
  },
  rightOverlayIcon: {
    color: "#001F74",
    fontSize: 26,
    fontWeight: "700",
  },
  bottomBar: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 14,
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D4D8E2",
    backgroundColor: "#ECECEC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },
  bottomBarLeft: {
    color: "#585B62",
    fontSize: 16,
    fontWeight: "500",
  },
  bottomBarRight: {
    color: "#61646A",
    fontSize: 15,
    fontWeight: "500",
  },
  feedSection: {
    backgroundColor: "#EFF3FC",
    paddingTop: 16,
    paddingBottom: 22,
  },
  feedTitle: {
    color: "#001F74",
    fontSize: 28 / 2,
    fontWeight: "700",
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  footer: {
    backgroundColor: "#001F74",
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  footerHeading: {
    color: "#EAF0FF",
    fontSize: 40 / 2,
    fontWeight: "800",
    marginBottom: 10,
  },
  footerBody: {
    color: "#C5D0EC",
    fontSize: 19 * 0.95,
    lineHeight: 33,
    marginBottom: 28,
  },
  footerCopyright: {
    color: "#C5D0EC",
    fontSize: 17 * 0.95,
    lineHeight: 26,
  },
  centerContent: {
    flex: 1,
    backgroundColor: "#001F74",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  loadingText: {
    marginTop: 12,
    color: "#EAF0FF",
    fontSize: 15,
    fontWeight: "600",
  },
  errorText: {
    color: "#FECACA",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 12,
  },
  retryButton: {
    borderWidth: 1,
    borderColor: "#D7E1FA",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  retryText: {
    color: "#EAF0FF",
    fontSize: 14,
    fontWeight: "600",
  },
});
