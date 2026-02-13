/**
 * Sunshade Mobile App - Modern, Clean Color Palette
 * Light and dark mode colors optimized for readability and visual hierarchy
 */

import { Platform } from "react-native";

// Sunshade primary colors - modern blue tint
const primaryLight = "#2563EB"; // Vibrant blue
const primaryDark = "#60A5FA"; // Lighter blue for dark mode
const accentLight = "#EC4899"; // Accent pink
const accentDark = "#F472B6"; // Lighter pink for dark mode

export const Colors = {
  light: {
    text: "#1F2937", // Dark gray for main text
    background: "#FFFFFF", // Clean white
    tint: primaryLight, // Primary blue
    icon: "#6B7280", // Medium gray
    tabIconDefault: "#9CA3AF", // Light gray
    tabIconSelected: primaryLight,
    card: "#F9FAFB", // Very light gray
    border: "#E5E7EB", // Light border
    subtitle: "#6B7280", // Subtitle gray
    accent: accentLight, // Pink accent
  },
  dark: {
    text: "#F3F4F6", // Light gray
    background: "#111827", // Very dark gray
    tint: primaryDark, // Light blue
    icon: "#D1D5DB", // Light gray
    tabIconDefault: "#9CA3AF", // Medium gray
    tabIconSelected: primaryDark,
    card: "#1F2937", // Dark card background
    border: "#374151", // Dark border
    subtitle: "#9CA3AF", // Subtitle gray
    accent: accentDark, // Light pink accent
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
