const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.server = {
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      res.setHeader('Cache-Control', 'no-store');
      return middleware(req, res, next);
    };
  },
};

config.serializer = {
  ...config.serializer,
  getPolyfills: () => [
    path.resolve(__dirname, 'polyfills.js'),
  ],
};

module.exports = config;
