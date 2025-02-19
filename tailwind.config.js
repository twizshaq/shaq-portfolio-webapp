/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
    			custom: '1000px',
    			mobile: '600px',
    			mobile2: '495px',
          mobile4: '487px',
				  mobile3: '860px',
          mobile5: '820px',
    			whenwrap: '1420px',
          whenwrap3: '1235px',
          whenwrap4: '1195px',
    			whenwrap2: '1255px'
    		}
    },
  },
  plugins: [],
}
