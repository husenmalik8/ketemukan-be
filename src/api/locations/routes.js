const routes = (handler) => [
  {
    method: 'GET',
    path: '/locations',
    handler: handler.getAllLocationsHandler,
  },
];

module.exports = routes;
