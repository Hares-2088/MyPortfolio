module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(pdf|png|jpe?g|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require('tailwindcss'),
            require('autoprefixer'),
          ],
        },
      },
    },
  },
};
