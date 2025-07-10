const AuthenticationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'authentications',
  version: '1.0.0',
  register: async (server, { service, tokenManager, validator }) => {
    const authenticationsHandler = new AuthenticationsHandler(
      service,
      tokenManager,
      validator
    );
    server.route(routes(authenticationsHandler));
  },
};
