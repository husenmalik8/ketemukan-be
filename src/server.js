const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: '0.0.0.0',
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: () => {
      return {
        status: 'success',
        message: 'Halo dari Railway dalam bentuk JSON!',
      };
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
