import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { ExternalLink } from "@/components/external-link";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Collapsible } from "@/components/ui/collapsible";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function DiscoverScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <ThemedText style={styles.title}>🔍 Discover</ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.subtitle }]}>
          Learn about Sunshade
        </ThemedText>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <View style={styles.infoCard}>
          <ThemedText style={styles.cardTitle}>About Sunshade</ThemedText>
          <ThemedText style={[styles.cardText, { color: colors.subtitle }]}>
            Sunshade is your gateway to discovering all campus events at UIC.
            Find seminars, workshops, social gatherings, and more—all in one
            place.
          </ThemedText>
        </View>

        <Collapsible title="🎯 Key Features">
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <ThemedText style={styles.featureBullet}>•</ThemedText>
              <ThemedText
                style={[styles.featureText, { color: colors.subtitle }]}
              >
                Browse all campus events with real-time updates
              </ThemedText>
            </View>
            <View style={styles.featureItem}>
              <ThemedText style={styles.featureBullet}>•</ThemedText>
              <ThemedText
                style={[styles.featureText, { color: colors.subtitle }]}
              >
                View event locations on interactive maps
              </ThemedText>
            </View>
            <View style={styles.featureItem}>
              <ThemedText style={styles.featureBullet}>•</ThemedText>
              <ThemedText
                style={[styles.featureText, { color: colors.subtitle }]}
              >
                See attendee counts and event details
              </ThemedText>
            </View>
            <View style={styles.featureItem}>
              <ThemedText style={styles.featureBullet}>•</ThemedText>
              <ThemedText
                style={[styles.featureText, { color: colors.subtitle }]}
              >
                Create and share your own events
              </ThemedText>
            </View>
          </View>
        </Collapsible>

        <Collapsible title="🏫 Built for UIC">
          <ThemedText style={[styles.cardText, { color: colors.subtitle }]}>
            Sunshade is designed specifically for the University of Illinois at
            Chicago community. All events are verified and organized by
            recognized student groups and departments.
          </ThemedText>
        </Collapsible>

        <Collapsible title="ℹ️ Getting Started">
          <View style={styles.stepList}>
            <View style={styles.step}>
              <View
                style={[
                  styles.stepNumber,
                  { backgroundColor: colors.tint, color: colors.background },
                ]}
              >
                <ThemedText
                  style={{ color: colors.background, fontWeight: "700" }}
                >
                  1
                </ThemedText>
              </View>
              <ThemedText style={[styles.stepText, { color: colors.subtitle }]}>
                Browse events in the Home tab
              </ThemedText>
            </View>
            <View style={styles.step}>
              <View
                style={[
                  styles.stepNumber,
                  { backgroundColor: colors.tint, color: colors.background },
                ]}
              >
                <ThemedText
                  style={{ color: colors.background, fontWeight: "700" }}
                >
                  2
                </ThemedText>
              </View>
              <ThemedText style={[styles.stepText, { color: colors.subtitle }]}>
                Tap an event to see full details and location
              </ThemedText>
            </View>
            <View style={styles.step}>
              <View
                style={[
                  styles.stepNumber,
                  { backgroundColor: colors.tint, color: colors.background },
                ]}
              >
                <ThemedText
                  style={{ color: colors.background, fontWeight: "700" }}
                >
                  3
                </ThemedText>
              </View>
              <ThemedText style={[styles.stepText, { color: colors.subtitle }]}>
                Confirm your attendance or share with friends
              </ThemedText>
            </View>
          </View>
        </Collapsible>

        <Collapsible title="📱 Mobile-First Design">
          <ThemedText style={[styles.cardText, { color: colors.subtitle }]}>
            Sunshade Mobile is optimized for quick browsing and discovery on the
            go. Fast loading, intuitive navigation, and beautiful design make
            finding events effortless.
          </ThemedText>
        </Collapsible>

        <View style={styles.ctaSection}>
          <ThemedText
            style={[
              styles.ctaText,
              { color: colors.subtitle, textAlign: "center" },
            ]}
          >
            Questions? Visit the Sunshade website for more information.
          </ThemedText>
          <ExternalLink href="https://uic.sunshade.app">
            <View
              style={[
                styles.ctaButton,
                { backgroundColor: colors.tint, borderColor: colors.tint },
              ]}
            >
              <ThemedText
                style={[styles.ctaButtonText, { color: colors.background }]}
              >
                Visit Sunshade Web
              </ThemedText>
            </View>
          </ExternalLink>
        </View>

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
  content: {
    flex: 1,
    paddingHorizontal: 12,
  },
  infoCard: {
    backgroundColor: "rgba(37, 99, 235, 0.08)",
    borderRadius: 12,
    padding: 14,
    marginVertical: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#2563EB",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 13,
    lineHeight: 18,
  },
  featureList: {
    gap: 10,
    paddingVertical: 8,
  },
  featureItem: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
  },
  featureBullet: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2563EB",
    width: 12,
  },
  featureText: {
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
  },
  stepList: {
    gap: 12,
    paddingVertical: 8,
  },
  step: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  stepText: {
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
    paddingTop: 4,
  },
  ctaSection: {
    marginTop: 24,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  ctaText: {
    fontSize: 13,
    marginBottom: 12,
  },
  ctaButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
  },
  ctaButtonText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  bottomPadding: {
    height: 32,
  },
});
