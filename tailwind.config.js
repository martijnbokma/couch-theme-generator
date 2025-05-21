/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

export default {
    // In Tailwind CSS v4 wordt content automatisch gedetecteerd
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2563eb',
                    dark: '#1d4ed8',
                    light: '#3b82f6',
                },
                secondary: {
                    DEFAULT: '#4f46e5',
                    dark: '#4338ca',
                    light: '#6366f1',
                },
                couch: {
                    blue: '#2563eb',
                    indigo: '#4f46e5',
                    gray: '#64748b',
                    dark: '#1e293b',
                    light: '#f8fafc',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            boxShadow: {
                nav: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
        },
    },
    plugins: [
        typography,
        forms,
    ],
}
