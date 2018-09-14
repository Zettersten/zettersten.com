module.exports = ({ file, options, env }) => ({
    plugins: {
      'postcss-import': {},
      'tailwindcss': './config.js',
      'postcss-input-range': {},
      'postcss-color-function': {},
      'autoprefixer': true,
      'cssnano': env === 'production' ? true : false
    }
  })