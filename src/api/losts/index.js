const LostsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'losts',
  version: '1.0.0',
  register: async (
    server,
    { service, validator, pointService, achievementService }
  ) => {
    const lostsHandler = new LostsHandler(
      service,
      validator,
      pointService,
      achievementService
    );
    server.route(routes(lostsHandler));
  },
};
