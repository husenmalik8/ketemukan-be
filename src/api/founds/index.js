const FoundsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'founds',
  version: '1.0.0',
  register: async (
    server,
    { service, validator, pointService, achievementService }
  ) => {
    const foundsHandler = new FoundsHandler(
      service,
      validator,
      pointService,
      achievementService
    );
    server.route(routes(foundsHandler));
  },
};
