const LostCommentsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'lostComments',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const lostCommentsHandler = new LostCommentsHandler(service, validator);
    server.route(routes(lostCommentsHandler));
  },
};
