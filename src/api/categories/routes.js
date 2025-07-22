const routes = (handler) => [
  {
    method: 'GET',
    path: '/categories',
    handler: handler.getAllCategoriesHandler,
  },
  {
    method: 'POST',
    path: '/categories',
    handler: handler.postCategoriesHandler,
  },
  {
    method: 'DELETE',
    path: '/categories/{id}',
    handler: handler.deleteCategoriesHandler,
  },
];

module.exports = routes;
