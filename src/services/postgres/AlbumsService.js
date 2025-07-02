const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const ServerError = require('../../exceptions/ServerError');

class AlbumsService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async getAlbums() {
    const result = await this._pool
      .query('SELECT * FROM connection')
      .catch((error) => {
        console.error(error);
        throw new ServerError('Internal server error');
      });

    return result.rows;
  }
}

module.exports = AlbumsService;
