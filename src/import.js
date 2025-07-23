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

// categories
const categories = require('./api/categories');
const CategoriesService = require('./services/postgres/CategoriesService');

// locations
const locations = require('./api/locations');
const LocationsService = require('./services/postgres/LocationsService');

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

const PointService = require('./services/postgres/PointService');
const AchievementService = require('./services/postgres/AchievementService');

module.exports = {
  Hapi,
  Jwt,
  Inert,
  path,
  HttpError,
  TokenManager,
  albums,
  AlbumsService,
  AlbumsValidator,
  categories,
  CategoriesService,
  locations,
  LocationsService,
  losts,
  LostsService,
  LostsValidator,
  lostComments,
  LostCommentsValidator,
  founds,
  FoundsService,
  FoundsValidator,
  foundComments,
  FoundCommentsValidator,
  users,
  UsersService,
  UsersValidator,
  authentications,
  AuthenticationsService,
  AuthenticationsValidator,
  uploads,
  StorageService,
  UploadsValidator,
  PointService,
  AchievementService,
};
