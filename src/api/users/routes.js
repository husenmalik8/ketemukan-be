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

  {
    method: 'GET',
    path: '/my/lost-items',
    handler: handler.getMyLostItemsHandler,
    options: {
      auth: 'ketemukan_jwt',
    },
  },
];

module.exports = routes;
