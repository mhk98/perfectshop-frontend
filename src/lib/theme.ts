/**
 * Perfect Shop Brand Color Palette
 * Derived directly from the official logo:
 * - Primary: Deep Obsidian Charcoal / Slate Black (#111827) from the sleek logo background
 * - Secondary / Gold: Vibrant Golden Yellow (#FFB800) from "Shop", the cart/bag icon & dynamic accents
 * - Neutral / Contrast: Crisp White (#FFFFFF) & Pure Black (#000000)
 */

export const THEME = {
  // Brand Primary (Deep Obsidian Charcoal / Slate Black)
  primary: "#111827",
  primaryHover: "#000000",
  primaryDark: "#030712",
  primaryLight: "#F3F4F6",
  primaryBorder: "#E5E7EB",

  // Brand Secondary (Vibrant Golden Yellow / Amber Gold)
  gold: "#FFB800",
  goldHover: "#E5A600",
  goldDark: "#C58D00",
  goldLight: "#FFFBEB",
  goldBorder: "#FDE68A",

  // Common UI aliases
  secondary: "#FFB800",
  secondaryHover: "#E5A600",

  // Alerts & Accents
  accentRed: "#D7262E",
  whatsappGreen: "#12C64B",
  successGreen: "#16A34A",

  // Neutrals
  dark: "#111827",
  muted: "#6B7280",
  lightBg: "#F7F8FA",
  border: "#E5E7EB",
} as const;

export const PRIMARY = THEME.primary;
export const SECONDARY = THEME.secondary;
export const GOLD = THEME.gold;
export const ACCENT = THEME.accentRed;

