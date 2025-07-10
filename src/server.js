require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');
const path = require('path');

const HttpError = require('./exceptions/HttpError');
const TokenManager = require('./tokenize/TokenManager');

// albums
const albums = require('./api/albums');
const AlbumsService = require('./services/postgres/AlbumsService');
const AlbumsValidator = require('./validator/albums');

// losts
const losts = require('./api/losts');
const LostsService = require('./services/postgres/LostsService');
const LostsValidator = require('./validator/losts');

// lost-comments
const lostComments = require('./api/lost-comments');
const LostCommentsValidator = require('./validator/lost-comments');

// founds
const founds = require('./api/founds');
const FoundsService = require('./services/postgres/FoundsService');
const FoundsValidator = require('./validator/founds');

// found-comments
const foundComments = require('./api/found-comments');
const FoundCommentsValidator = require('./validator/found-comments');

// users
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

// authentications
const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const AuthenticationsValidator = require('./validator/authentications');

// uploads
const uploads = require('./api/uploads');
const StorageService = require('./services/storage/StorageService');
const UploadsValidator = require('./validator/uploads');

const init = async () => {
  const albumsService = new AlbumsService();
  const lostsService = new LostsService();
  const foundsService = new FoundsService();
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const storageService = new StorageService(
    path.resolve(__dirname, 'api/uploads/file/images')
  );

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Jwt,
    },
    {
      plugin: Inert,
    },
  ]);

  server.auth.strategy('ketemukan_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: albumsService,
        validator: AlbumsValidator,
      },
    },
    {
      plugin: losts,
      options: {
        service: lostsService,
        validator: LostsValidator,
      },
    },
    {
      plugin: lostComments,
      options: {
        service: lostsService,
        validator: LostCommentsValidator,
      },
    },
    {
      plugin: founds,
      options: {
        service: foundsService,
        validator: FoundsValidator,
      },
    },
    {
      plugin: foundComments,
      options: {
        service: foundsService,
        validator: FoundCommentsValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        service: authenticationsService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: uploads,
      options: {
        service: storageService,
        validator: UploadsValidator,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof HttpError) {
      const newResponse = h.response({
        status: response.status,
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: () => ({ status: 'ok' }),
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
