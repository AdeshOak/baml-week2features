const webpack = require('webpack');

module.exports = {
  reactStrictMode: true, // Optional: Enable strict mode for better debugging
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      stream: require.resolve('stream-browserify'), // Add polyfill for stream
    };
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: 'process/browser', // Add process polyfill
        Buffer: ['buffer', 'Buffer'], // Add Buffer polyfill
      })
    );
    return config;
  },
};
