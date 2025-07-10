const routes = (handler) => [
  {
    method: 'POST',
    path: '/founds',
    handler: handler.postFoundHandler,
    options: {
      auth: 'ketemukan_jwt',
    },
  },
  {
    method: 'GET',
    path: '/founds',
    handler: handler.getFoundsHandler,
  },
  {
    method: 'GET',
    path: '/founds/{id}',
    handler: handler.getFoundByIdHandler,
  },
];

module.exports = routes;
