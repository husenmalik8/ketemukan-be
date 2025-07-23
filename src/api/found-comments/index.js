const FoundCommentsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'foundComments',
  version: '1.0.0',
  register: async (
    server,
    { service, validator, pointService, achievementService }
  ) => {
    const foundCommentsHandler = new FoundCommentsHandler(
      service,
      validator,
      pointService,
      achievementService
    );
    server.route(routes(foundCommentsHandler));
  },
};
