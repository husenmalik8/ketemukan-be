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
    method: 'PUT',
    path: '/users',
    handler: handler.putUserHandler,
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
  {
    method: 'GET',
    path: '/my/found-items',
    handler: handler.getMyFoundItemsHandler,
    options: {
      auth: 'ketemukan_jwt',
    },
  },
  {
    method: 'GET',
    path: '/my/achievements',
    handler: handler.getMyAchievementsHandler,
    options: {
      auth: 'ketemukan_jwt',
    },
  },
];

module.exports = routes;
