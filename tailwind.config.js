import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
    ],
    theme: {},
    plugins: [
        react(),
        tailwindcss()
    ],
}