const routes = (handler) => [
  {
    method: 'POST',
    path: '/founds/{id}/comments',
    handler: handler.postFoundCommentHandler,
    options: {
      auth: 'ketemukan_jwt',
    },
  },
];

module.exports = routes;
