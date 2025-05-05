import forms from '@tailwindcss/forms';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                poppins: ['Poppins', 'sans-serif'],
            },
            colors: {
                white: '#ffffff',
                'soft-gray': '#F0F0F0',
                'light-cream': '#FFF8DC',
                'bright-blue': '#3484FB',
                'deep-navy': '#1C3F5E',
                'mint-green': '#A6E5C1',
                'dark-blue': '#14549A',
                'deep-blue': '#0C3766',
            },
            animation: {
                'scroll-left':
                    'scroll-left var(--scroll-duration, 20s) linear infinite',
                'scroll-right':
                    'scroll-right var(--scroll-duration, 20s) linear infinite',
            },
            keyframes: {
                'scroll-left': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'scroll-right': {
                    '0%': { transform: 'translateX(-50%)' },
                    '100%': { transform: 'translateX(0)' },
                },
            },
        },
    },

    plugins: [
        forms,
        function ({ addUtilities }) {
            addUtilities({
                '.break-anywhere': {
                    'overflow-wrap': 'anywhere',
                },
            });
        },
    ],
};
