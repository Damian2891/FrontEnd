import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  //prefix: 'tw-', 
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito', 'Arial','sans-serif']
      }
    },
  },
  plugins: [],
});
