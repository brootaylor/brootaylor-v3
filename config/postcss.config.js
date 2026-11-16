export default {
  plugins: {
    // Adds any CSS fallbacks and vendor prefixes needed by the browsers listed in `.browserslistrc`
    'postcss-preset-env': {
      stage: 4, // Only transform CSS features that are already part of a finished web standard
    },
  },
};
