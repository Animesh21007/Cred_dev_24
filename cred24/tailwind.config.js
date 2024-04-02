/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: ['selector', '[data-mode="dark"]'],
	theme: {
		// screens: {
		// 	sm: '480px',
		// 	md: '768px',
		// 	lg: '976px',
		// 	xl: '1440px',
		// },
		screens: {
			sm: '500px',
			// => @media (min-width: 640px) { ... }

			md: '768px',
			// => @media (min-width: 768px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px',
			// => @media (min-width: 1536px) { ... }
		},
		// colors: {
		// 	// transparent: 'transparent',
		// 	// current: 'currentColor',
		// 	// white: '#ffffff',
		// 	// purple: '#3f3cbb',
		// 	// midnight: '#121063',
		// 	// metal: '#565584',
		// 	// tahiti: '#3ab7bf',
		// 	// silver: '#ecebff',
		// 	// bubblegum: '#ff77e9',
		// 	// bermuda: '#78dcca',
		// },
		extend: {},
	},
	plugins: [],
	variants: {
		extend: {
			// ...
			transitionDuration: ['hover', 'focus'],
		},
	},
};
