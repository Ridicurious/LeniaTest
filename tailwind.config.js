// tailwind.config.js
tailwind.config = {
    theme: {
        extend: {
            colors: {
                // Primary/Accent colors remain the same, adjust if contrast is poor on dark bg
                primary: '#3b82f6',      // Blue
                secondary: '#1e40af',    // Darker Blue
                accent: '#9B59B6',      // Violet
                
                // Dark Theme Palette
                dark: '#0f172a',        // Very Dark Blue (Main BG)
                light: '#f8fafc',       // Off White (for contrast elements if needed)
                
                // Grays adjusted for dark mode
                gray: {
                  DEFAULT: '#9ca3af', // Default gray text
                  50: '#f9fafb',   // Very light gray (Use sparingly)
                  100: '#f3f4f6',  // Light gray
                  200: '#e5e7eb',  // Lighter gray text/elements
                  300: '#d1d5db',  // Light gray text
                  400: '#9ca3af',  // Medium gray text/borders
                  500: '#6b7280',  // Darker medium gray
                  600: '#4b5563',  // Card borders, subtle elements
                  700: '#374151',  // Card backgrounds, input fields
                  800: '#1f2937',  // Section backgrounds, slightly lighter than main bg
                  900: '#111827',  // Alt dark background (e.g., nav/footer)
                }
            },
            fontFamily: {
                sans: ['Century Gothic', 'CenturyGothic', 'AppleGothic', 'sans-serif'], 
            },
        }
    }
}
