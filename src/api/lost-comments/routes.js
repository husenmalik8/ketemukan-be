const routes = (handler) => [
  {
    method: 'POST',
    path: '/losts/{id}/comments',
    handler: handler.postLostCommentHandler,
    options: {
      auth: 'ketemukan_jwt',
    },
  },
];

module.exports = routes;
