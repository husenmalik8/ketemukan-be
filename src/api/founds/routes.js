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
    method: 'PUT',
    path: '/founds/{id}',
    handler: handler.putFoundHandler,
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
  {
    method: 'DELETE',
    path: '/founds/{id}',
    handler: handler.deleteFoundItemByIdHandler,
    options: {
      auth: 'ketemukan_jwt',
    },
  },
];

module.exports = routes;
