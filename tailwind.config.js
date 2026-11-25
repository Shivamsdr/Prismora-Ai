/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ─── Colour palette ───────────────────────────────────────────────
      colors: {
        // Brand primaries
        teal: {
          50:  '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        // Deep navy blues
        navy: {
          50:  '#f0f4ff',
          100: '#e0eaff',
          200: '#c7d7fe',
          300: '#a5b8fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#1e3a5f',
          700: '#1a3151',
          800: '#152843',
          900: '#0f1f35',
          950: '#091525',
        },
        // Neutral surface palette
        neutral: {
          0:   '#ffffff',
          50:  '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#6c757d',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
          950: '#0d1117',
        },
      },

      // ─── Typography ───────────────────────────────────────────────────
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'Cascadia Code',
          'monospace',
        ],
        display: [
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },

      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        xs:   ['0.75rem',  { lineHeight: '1rem'      }],
        sm:   ['0.875rem', { lineHeight: '1.25rem'   }],
        base: ['1rem',     { lineHeight: '1.5rem'    }],
        lg:   ['1.125rem', { lineHeight: '1.75rem'   }],
        xl:   ['1.25rem',  { lineHeight: '1.75rem'   }],
        '2xl':['1.5rem',   { lineHeight: '2rem'      }],
        '3xl':['1.875rem', { lineHeight: '2.25rem'   }],
        '4xl':['2.25rem',  { lineHeight: '2.5rem'    }],
        '5xl':['3rem',     { lineHeight: '1.1'       }],
        '6xl':['3.75rem',  { lineHeight: '1.05'      }],
        '7xl':['4.5rem',   { lineHeight: '1'         }],
      },

      fontWeight: {
        thin:       '100',
        extralight: '200',
        light:      '300',
        normal:     '400',
        medium:     '500',
        semibold:   '600',
        bold:       '700',
        extrabold:  '800',
        black:      '900',
      },

      letterSpacing: {
        tightest: '-0.05em',
        tighter:  '-0.025em',
        tight:    '-0.015em',
        normal:   '0em',
        wide:     '0.025em',
        wider:    '0.05em',
        widest:   '0.1em',
        caps:     '0.12em',
      },

      // ─── Spacing ──────────────────────────────────────────────────────
      spacing: {
        px:   '1px',
        0:    '0px',
        0.5:  '0.125rem',
        1:    '0.25rem',
        1.5:  '0.375rem',
        2:    '0.5rem',
        2.5:  '0.625rem',
        3:    '0.75rem',
        3.5:  '0.875rem',
        4:    '1rem',
        5:    '1.25rem',
        6:    '1.5rem',
        7:    '1.75rem',
        8:    '2rem',
        9:    '2.25rem',
        10:   '2.5rem',
        11:   '2.75rem',
        12:   '3rem',
        14:   '3.5rem',
        16:   '4rem',
        18:   '4.5rem',
        20:   '5rem',
        24:   '6rem',
        28:   '7rem',
        32:   '8rem',
        36:   '9rem',
        40:   '10rem',
        44:   '11rem',
        48:   '12rem',
        52:   '13rem',
        56:   '14rem',
        60:   '15rem',
        64:   '16rem',
        72:   '18rem',
        80:   '20rem',
        96:   '24rem',
      },

      // ─── Border radius ────────────────────────────────────────────────
      borderRadius: {
        none:  '0px',
        sm:    '0.125rem',
        DEFAULT:'0.25rem',
        md:    '0.375rem',
        lg:    '0.5rem',
        xl:    '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full:  '9999px',
      },

      // ─── Shadows ──────────────────────────────────────────────────────
      boxShadow: {
        none:    'none',
        xs:      '0 1px 2px 0 rgb(0 0 0 / 0.04)',
        sm:      '0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
        DEFAULT: '0 2px 8px 0 rgb(0 0 0 / 0.08), 0 1px 3px -1px rgb(0 0 0 / 0.06)',
        md:      '0 4px 12px -2px rgb(0 0 0 / 0.08), 0 2px 6px -2px rgb(0 0 0 / 0.06)',
        lg:      '0 8px 24px -4px rgb(0 0 0 / 0.08), 0 4px 10px -4px rgb(0 0 0 / 0.05)',
        xl:      '0 16px 40px -8px rgb(0 0 0 / 0.1), 0 8px 16px -8px rgb(0 0 0 / 0.06)',
        // Teal glow — used sparingly on key CTAs
        'teal-sm': '0 0 0 3px rgb(20 184 166 / 0.15)',
        'teal-md': '0 0 0 4px rgb(20 184 166 / 0.2)',
        // Inset
        'inner-sm': 'inset 0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'inner':    'inset 0 2px 4px 0 rgb(0 0 0 / 0.06)',
      },

      // ─── Transitions ─────────────────────────────────────────────────
      transitionDuration: {
        fast:    '100ms',
        DEFAULT: '150ms',
        slow:    '250ms',
        slower:  '350ms',
      },

      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
        in:      'cubic-bezier(0.4, 0, 1, 1)',
        out:     'cubic-bezier(0, 0, 0.2, 1)',
        'in-out':'cubic-bezier(0.4, 0, 0.2, 1)',
        spring:  'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      // ─── Max widths ───────────────────────────────────────────────────
      maxWidth: {
        'screen-xs': '480px',
        'screen-sm': '640px',
        'screen-md': '768px',
        'screen-lg': '1024px',
        'screen-xl': '1280px',
        'screen-2xl':'1440px',
        'screen-3xl':'1920px',
        content:     '72rem',   // 1152px — editorial column
        prose:       '65ch',
        narrow:      '48rem',
      },

      // ─── Z-index ──────────────────────────────────────────────────────
      zIndex: {
        behind:  '-1',
        base:    '0',
        raised:  '10',
        dropdown:'100',
        sticky:  '200',
        overlay: '300',
        modal:   '400',
        toast:   '500',
        tooltip: '600',
      },
    },
  },
  plugins: [],
};
