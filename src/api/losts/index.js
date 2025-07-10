const LostsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'losts',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const lostsHandler = new LostsHandler(service, validator);
    server.route(routes(lostsHandler));
  },
};
