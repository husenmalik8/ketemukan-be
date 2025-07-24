const path = require('path');

const routes = (handler) => [
  // users
  {
    method: 'POST',
    path: '/users/picture',
    handler: handler.postUploadUserPictureHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 512000,
      },
      auth: 'ketemukan_jwt',
    },
  },
  {
    method: 'GET',
    path: '/users/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file'),
      },
    },
  },

  // losts
  {
    method: 'POST',
    path: '/losts/{id}/picture',
    handler: handler.postUploadLostPictureHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 512000,
      },
      auth: 'ketemukan_jwt',
    },
  },
  {
    method: 'GET',
    path: '/losts/{id}/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file'),
      },
    },
  },

  // founds
  {
    method: 'POST',
    path: '/founds/{id}/picture',
    handler: handler.postUploadFoundPictureHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 512000,
      },
      auth: 'ketemukan_jwt',
    },
  },
  {
    method: 'GET',
    path: '/founds/{id}/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file'),
      },
    },
  },
];

module.exports = routes;
