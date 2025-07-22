const LocationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'locations',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const locationsHandler = new LocationsHandler(service, validator);
    server.route(routes(locationsHandler));
  },
};
