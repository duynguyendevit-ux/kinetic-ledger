import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Surface colors
        'background': '#0b1326',
        'surface': '#0b1326',
        'surface-container-lowest': '#060e20',
        'surface-container-low': '#131b2e',
        'surface-container': '#171f33',
        'surface-container-high': '#222a3d',
        'surface-container-highest': '#2d3449',
        'surface-bright': '#31394d',
        'surface-variant': '#2d3449',
        
        // Primary (Cyan)
        'primary': '#c3f5ff',
        'primary-container': '#00e5ff',
        'primary-fixed-dim': '#00daf3',
        'on-primary': '#00363d',
        'on-primary-container': '#00626e',
        'on-primary-fixed': '#001f24',
        'inverse-primary': '#006875',
        
        // Secondary
        'secondary': '#bcc7de',
        'secondary-container': '#3e495d',
        'secondary-fixed': '#d8e3fb',
        'secondary-fixed-dim': '#bcc7de',
        'on-secondary': '#263143',
        'on-secondary-fixed': '#111c2d',
        
        // Tertiary (Emerald)
        'tertiary': '#a8ffd2',
        'tertiary-container': '#005236',
        'tertiary-fixed': '#6ffbbe',
        'tertiary-fixed-dim': '#4edea3',
        'on-tertiary': '#003824',
        'on-tertiary-fixed': '#002113',
        'on-tertiary-fixed-variant': '#005236',
        
        // Error
        'error': '#ffb4ab',
        'error-container': '#93000a',
        'on-error': '#690005',
        'on-error-container': '#ffdad6',
        
        // Text
        'on-surface': '#dae2fd',
        'on-surface-variant': '#bac9cc',
        
        // Outline
        'outline': '#8b9799',
        'outline-variant': '#3b494c',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        'px': '1px',
        '0': '0rem',
        '1': '0.125rem',   // 2px
        '2': '0.25rem',    // 4px
        '3': '0.5rem',     // 8px
        '4': '0.75rem',    // 12px
        '5': '1rem',       // 16px
        '6': '1.25rem',    // 20px
        '7': '1.5rem',     // 24px
        '8': '1.75rem',    // 28px
        '9': '2rem',       // 32px
        '10': '2.5rem',    // 40px
      },
      borderRadius: {
        'xs': '0.125rem',  // 2px
        'sm': '0.25rem',   // 4px
        'md': '0.375rem',  // 6px
        'lg': '0.5rem',    // 8px
        'xl': '0.75rem',   // 12px
        '2xl': '1rem',     // 16px
      },
      backdropBlur: {
        'kinetic': '20px',
      },
    },
  },
  plugins: [],
}
export default config
