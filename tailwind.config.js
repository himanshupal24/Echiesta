/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'theme-black': 'var(--theme-black)',
                'custom-blue': '#0F0D27',
            },
            keyframes: {
                swipe: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
            },
            animation: {
                swipe: 'swipe var(--speed) linear infinite',
            },
        },
    },
    plugins: [],
};
