import {Colors} from "@/style/Colors";


const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
} as const;

const borderRadius = {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
} as const;

const fontSize = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
} as const;

const fontWeight = {
    normal: '400',
    medium: '500',
    bold: '700',
} as const;

const shadow = {
    sm: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
    },
    md: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    lg: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
} as const;

export const theme = {
    colors: Colors,
    spacing,
    borderRadius,
    fontSize,
    fontWeight,
    shadow,
} as const;

export type Theme = typeof theme;
export type ThemeMode = 'light' | 'dark';
export type ThemedProps<P> = P & { theme: Theme; themeMode: ThemeMode };