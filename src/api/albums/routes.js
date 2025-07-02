const routes = (handler) => [
  {
    method: 'GET',
    path: '/albums',
    handler: handler.getAlbumsHandler,
  },
];

module.exports = routes;
