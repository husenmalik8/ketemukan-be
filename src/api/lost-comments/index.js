const LostCommentsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'lostComments',
  version: '1.0.0',
  register: async (server, { service, validator, pointService }) => {
    const lostCommentsHandler = new LostCommentsHandler(
      service,
      validator,
      pointService
    );
    server.route(routes(lostCommentsHandler));
  },
};
