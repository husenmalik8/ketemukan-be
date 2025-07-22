const { Pool } = require('pg');
const ServerError = require('../../exceptions/ServerError');
const InvariantError = require('../../exceptions/InvariantError');
const { nanoid } = require('nanoid');

class LocationsService {
  constructor() {
    this._pool = new Pool();
  }

  async getLocations() {
    const result = await this._pool
      .query('SELECT id, name FROM locations')
      .catch((error) => {
        console.error(error);
        throw new ServerError('Internal server error');
      });

    return result.rows;
  }
}

module.exports = LocationsService;
