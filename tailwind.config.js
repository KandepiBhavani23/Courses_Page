/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"dark-navy": "#121F3A",
				"vivid-pink": "#F73CF2",
				"sky-blue": "#46A2DE",
				"light-blue": "#4B83F1",
				"bright-orange": "#F5D242",
				"vivid-green": "#0EFF8D",
				"bright-red": "#E32A4F",
			},
		},
	},
	plugins: [],
};
