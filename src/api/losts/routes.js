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
    method: 'GET',
    path: '/losts',
    handler: handler.getLostsHandler,
  },
  {
    method: 'GET',
    path: '/losts/{id}',
    handler: handler.getLostByIdHandler,
  },
];

module.exports = routes;
