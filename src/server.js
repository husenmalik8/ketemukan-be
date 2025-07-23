require('dotenv').config();

// prettier-ignore
const { Hapi, Jwt, Inert, path, HttpError, TokenManager, albums, AlbumsService, AlbumsValidator, categories, CategoriesService, locations, LocationsService, losts, LostsService, LostsValidator, lostComments, LostCommentsValidator, founds, FoundsService, FoundsValidator, foundComments, FoundCommentsValidator, users, UsersService, UsersValidator, authentications, AuthenticationsService, AuthenticationsValidator, uploads, StorageService, UploadsValidator, PointService, AchievementService } = require('./import');

const init = async () => {
  const albumsService = new AlbumsService();
  const categoriesService = new CategoriesService();
  const locationsService = new LocationsService();

  const lostsService = new LostsService();

  const pointService = new PointService();
  const achievementService = new AchievementService();

  const foundsService = new FoundsService();
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const storageService = new StorageService(
    path.resolve(__dirname, 'api/uploads/file/images')
  );

  const server = Hapi.server({
    port: process.env.PORT,
    host: '0.0.0.0',
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
      plugin: locations,
      options: {
        service: locationsService,
      },
    },
    {
      plugin: categories,
      options: {
        service: categoriesService,
      },
    },

    {
      plugin: losts,
      options: {
        service: lostsService,
        validator: LostsValidator,
        pointService: pointService,
        achievementService: achievementService,
      },
    },
    {
      plugin: lostComments,
      options: {
        service: lostsService,
        validator: LostCommentsValidator,
        pointService: pointService,
        achievementService: achievementService,
      },
    },
    {
      plugin: founds,
      options: {
        service: foundsService,
        validator: FoundsValidator,
        pointService: pointService,
        achievementService: achievementService,
      },
    },
    {
      plugin: foundComments,
      options: {
        service: foundsService,
        validator: FoundCommentsValidator,
        pointService: pointService,
        achievementService: achievementService,
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
