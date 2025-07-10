const FoundsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'founds',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const foundsHandler = new FoundsHandler(service, validator);
    server.route(routes(foundsHandler));
  },
};
