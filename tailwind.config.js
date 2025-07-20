module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], 
 heme: {
    extend: {
       colors: {
        primary: "#7de51c", 
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'pulse': 'pulse 2s infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
};

