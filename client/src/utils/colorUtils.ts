/**
 * Converts a hex color to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const standardHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(standardHex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Adjusts the brightness of a hex color.
 * @param hex The base hex color
 * @param percent Positive for lighter, negative for darker (-100 to 100)
 */
export function adjustColor(hex: string, percent: number): string {
  let rgb = hexToRgb(hex);
  if (!rgb) return hex;

  let { r, g, b } = rgb;

  r = Math.floor(r * (1 + percent / 100));
  g = Math.floor(g * (1 + percent / 100));
  b = Math.floor(b * (1 + percent / 100));

  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

/**
 * Converts Hex to rgba string
 */
export function hexToRgbaStr(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

/**
 * Calculates a contrasting text color (white or dark) based on perceived brightness
 */
export function getContrastColor(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return "#FFFFFF";
  
  // Perceived brightness formula
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  
  // If brightness is high (light background), return a dark color. Otherwise return white.
  return brightness > 140 ? "#171717" : "#FFFFFF";
}

/**
 * Generates all the necessary theme variables from a base hex color.
 */
export function generateThemeVariables(baseColor: string) {
  // Check if it's a valid hex, fallback to default if not
  const color = /^#([0-9A-F]{3}){1,2}$/i.test(baseColor) ? baseColor : "#C65D1A";

  // Lighter and darker variants
  const darker1 = adjustColor(color, -10);
  const lighter1 = adjustColor(color, 20);

  return {
    "--accent": color,
    "--accent-hover": darker1,
    "--accent-foreground": getContrastColor(color),
    "--accent-light": hexToRgbaStr(color, 0.1),
    
    // Gradients for accents
    "--accent-gradient-from": lighter1,
    "--accent-gradient-via": color,
    "--accent-gradient-to": darker1,

    // Sidebar gradients (often semi-transparent for 'from')
    "--sidebar-from": hexToRgbaStr(lighter1, 0.55),
    "--sidebar-via": color,
    "--sidebar-to": darker1,
  };
}

/**
 * Applies the generated theme variables to the document root
 */
export function applyThemeVariables(baseColor: string) {
  if (typeof document === 'undefined') return;
  const variables = generateThemeVariables(baseColor);
  
  Object.entries(variables).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}
