const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const ServerError = require('../../exceptions/ServerError');

class PointService {
  constructor() {
    this._pool = new Pool();
  }

  async addPoint(point, userId) {
    const query = {
      text: 'UPDATE users SET points = points + $1 WHERE id = $2 RETURNING id',
      values: [point, userId],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    const resultId = result.rows[0].id;

    if (!resultId) {
      throw new InvariantError('Points gagal ditambahkan');
    }

    return resultId;
  }
}

module.exports = PointService;
