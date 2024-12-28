import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

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
                poppins: ["Poppins", "sans-serif"],
            },
            colors: {
                'white' : '#ffffff',
                'soft-gray' : '#F0F0F0',
                'light-cream' : '#FFF8DC',
                'bright-blue' : '#3484FB',
                'deep-navy' : '#1C3F5E',
                'mint-green' : '#A6E5C1',
            },
        },
    },

    plugins: [forms],
};
