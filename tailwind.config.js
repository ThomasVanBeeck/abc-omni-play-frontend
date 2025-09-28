/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: [
    'variant',
    [
      '@media (prefers-color-scheme: dark) { &:not(.light *) }',
      '&:is(.dark *)',
      '@media (prefers-color-scheme: dark) { &:not(.light *) }',
    ],
  ],
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        "sans": ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
