const path = require('path');

const routes = (handler) => [
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
];

module.exports = routes;
