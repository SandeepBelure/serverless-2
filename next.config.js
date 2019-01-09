require('dotenv').config();
const withCSS = require('@zeit/next-css');
let api = process.env.API_URI;

module.exports = withCSS({
  serverRuntimeConfig: {
    api
  },
  publicRuntimeConfig: {
    api
  }
});
