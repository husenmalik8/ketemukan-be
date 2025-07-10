const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
  {
    method: 'GET',
    path: '/users',
    handler: handler.getUserHandler,
    options: {
      auth: 'ketemukan_jwt',
    },
  },
];

module.exports = routes;
