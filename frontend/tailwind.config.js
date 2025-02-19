/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            colors: {},
            keyframes: {
                pulseWidth: {
                    '0%, 100%': { width: '50%' },
                    '50%': { width: '100%' },
                },
            },
            animation: {
                'pulse-width': 'pulseWidth 1.5s ease-in-out infinite',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
