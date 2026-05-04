export const PUF = {
  // Background
  bg: '#0a0620',

  // Brand purple #2f1d70 and its tints/shades
  brand: '#2f1d70',
  blobBright: '#5e4f93',  // brand + 30% toward white
  blobDeep: '#211450',    // brand - 30% toward black

  // Accent purple (oklch hue ~280, mapped to hex)
  accent: '#7C35C9',      // oklch(0.62 0.22 280) — buttons, rings
  accentBright: '#9448DA',// oklch(0.72 0.22 280)
  accentDark: '#5A20A0',  // oklch(0.50 0.22 280)
  accentSoft: '#B08AE8',  // oklch(0.78 0.14 280) — dim accents
  accentLight: '#C4ADFA', // oklch(0.85 0.14 280) — labels, icons on dark

  // Button gradient stops
  btnTop: '#C084FC',      // oklch(0.78 0.20 280) — top of gradient
  btnMid: '#8B5CF6',      // oklch(0.62 0.24 280)
  btnBot: '#6D28D9',      // oklch(0.50 0.22 280)

  // Text
  text: '#FFFFFF',
  textDim: 'rgba(235,230,255,0.72)',
  textFaint: 'rgba(235,230,255,0.45)',

  // Glass surfaces
  glass: 'rgba(255,255,255,0.06)',
  glassAccent: 'rgba(124,53,201,0.18)',   // accent at 18% — selected state
  glassBorder: 'rgba(255,255,255,0.14)',
  glassBorderAccent: 'rgba(148,72,218,0.5)',
  glassHighlight: 'rgba(255,255,255,0.08)',

  // Bottom nav
  navBg: 'rgba(20,12,35,0.85)',

  // Status tier colours
  tierReach: '#FB923C',   // orange
  tierMatch: '#C4ADFA',   // accent light / purple
  tierSafety: '#4ADE80',  // green
} as const;

export const Fonts = {
  display: undefined as string | undefined,  // system default (SF Pro on iOS, Roboto on Android)
  sans: undefined as string | undefined,
};

// Legacy Colors export — kept so existing hooks/components don't break
export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: PUF.accentBright,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: PUF.accentBright,
  },
  dark: {
    text: '#ECEDEE',
    background: PUF.bg,
    tint: PUF.accentLight,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: PUF.accentLight,
  },
};
