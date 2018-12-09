require('dotenv').config();

let api = process.env.API_URI;

module.exports = {
  serverRuntimeConfig: {
    api
  },
  publicRuntimeConfig: {
    api
  }
};
