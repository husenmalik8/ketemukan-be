const routes = (handler) => [
  {
    method: 'POST',
    path: '/losts',
    handler: handler.postLostHandler,
    options: {
      auth: 'ketemukan_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/losts/{id}',
    handler: handler.putLostHandler,
    options: {
      auth: 'ketemukan_jwt',
    },
  },
  {
    method: 'GET',
    path: '/losts',
    handler: handler.getLostsHandler,
  },
  {
    method: 'GET',
    path: '/losts/{id}',
    handler: handler.getLostByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/losts/{id}',
    handler: handler.deleteLostItemByIdHandler,
    options: {
      auth: 'ketemukan_jwt',
    },
  },
];

module.exports = routes;
