import React from 'react';
import { Linking, Platform, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Event } from '@/types/events';

interface MapViewProps {
  events: Event[];
  selectedEventId?: string;
  onEventSelect?: (eventId: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

type MapboxModule = {
  setAccessToken: (token: string) => void;
  MapView: React.ComponentType<any>;
  Camera: React.ComponentType<any>;
  PointAnnotation: React.ComponentType<any>;
  StyleURL?: {
    Street?: string;
  };
};

let mapboxModule: MapboxModule | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  mapboxModule = require('@react-native-mapbox-gl/maps') as MapboxModule;
} catch {
  mapboxModule = null;
}

export const MapView: React.FC<MapViewProps> = ({
  events,
  selectedEventId,
  onEventSelect,
  containerStyle,
}) => {
  const token = process.env.EXPO_PUBLIC_MAPBOX_TOKEN?.trim();
  const validEvents = events.filter((event) => event.location);
  const defaultCenter: [number, number] = [-87.6477, 41.8719];

  const getMapCenter = (): [number, number] => {
    if (validEvents.length === 0) return defaultCenter;
    const lats = validEvents.map((e) => e.location.lat);
    const lngs = validEvents.map((e) => e.location.lng);
    const centerLat = (Math.max(...lats) + Math.min(...lats)) / 2;
    const centerLng = (Math.max(...lngs) + Math.min(...lngs)) / 2;
    return [centerLng, centerLat];
  };

  const NativeMapView = mapboxModule?.MapView;
  const NativeCamera = mapboxModule?.Camera;
  const NativePointAnnotation = mapboxModule?.PointAnnotation;

  if (mapboxModule && token) {
    mapboxModule.setAccessToken(token);
  }

  const openInMaps = async (event: Event) => {
    if (!event.location) return;
    const { lat, lng } = event.location;
    const label = encodeURIComponent(event.title || 'Event');
    const appleUrl = `http://maps.apple.com/?ll=${lat},${lng}&q=${label}`;
    const googleUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    const url = Platform.OS === 'ios' ? appleUrl : googleUrl;

    try {
      await Linking.openURL(url);
    } catch {
      // Ignore failures silently to avoid blocking UI.
    }
  };

  if (!NativeMapView || !NativeCamera || !NativePointAnnotation || !token) {
    return (
      <View style={[styles.container, containerStyle, styles.fallbackContainer]}>
        <Text style={styles.fallbackTitle}>Event locations</Text>
        <Text style={styles.fallbackSubtitle}>
          {token
            ? 'Mapbox native module unavailable in this build. Tap a location to open Maps.'
            : 'Set EXPO_PUBLIC_MAPBOX_TOKEN to render the Mapbox map. Tap a location to open Maps.'}
        </Text>
        {validEvents.slice(0, 6).map((event) => (
          <Pressable
            key={event.id}
            style={[
              styles.fallbackRow,
              selectedEventId === event.id && styles.fallbackRowSelected,
            ]}
            onPress={() => {
              onEventSelect?.(event.id);
              openInMaps(event);
            }}
          >
            <Text style={styles.fallbackRowTitle}>{event.title}</Text>
            <Text style={styles.fallbackRowMeta}>
              {event.location?.lat.toFixed(4)}, {event.location?.lng.toFixed(4)}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <NativeMapView
        style={styles.map}
        styleURL={mapboxModule?.StyleURL?.Street}
        logoEnabled={false}
        compassEnabled
      >
        <NativeCamera
          zoomLevel={14}
          centerCoordinate={getMapCenter()}
          animationMode="easeTo"
          animationDuration={500}
        />
        {validEvents.map(
          (event) =>
            event.location && (
              <NativePointAnnotation
                key={event.id}
                id={event.id}
                coordinate={[event.location.lng, event.location.lat]}
                onSelected={() => onEventSelect?.(event.id)}
              >
                <View
                  style={[
                    styles.marker,
                    selectedEventId === event.id && styles.markerSelected,
                  ]}
                >
                  <View style={styles.markerDot} />
                </View>
              </NativePointAnnotation>
            )
        )}
      </NativeMapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 320,
  },
  map: {
    flex: 1,
  },
  fallbackContainer: {
    backgroundColor: '#111827',
    padding: 16,
    justifyContent: 'center',
  },
  fallbackTitle: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  fallbackSubtitle: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 12,
  },
  fallbackRow: {
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  fallbackRowSelected: {
    borderColor: '#60A5FA',
    borderWidth: 1,
  },
  fallbackRowTitle: {
    color: '#F3F4F6',
    fontSize: 13,
    fontWeight: '600',
  },
  fallbackRowMeta: {
    color: '#9CA3AF',
    fontSize: 11,
    marginTop: 2,
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  markerSelected: {
    backgroundColor: '#EC4899',
    borderWidth: 4,
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  markerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});
