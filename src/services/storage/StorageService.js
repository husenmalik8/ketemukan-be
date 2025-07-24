const { Pool } = require('pg');

const NotFoundError = require('../../exceptions/NotFoundError');
const ServerError = require('../../exceptions/ServerError');

class StorageService {
  constructor() {
    this._pool = new Pool();
  }

  async editUserPicture(userId, fileLocation) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE users SET picture_url = $1, updated_at = $2 WHERE id = $3 RETURNING id',
      values: [fileLocation, updatedAt, userId],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui user picture. Id tidak ditemukan');
    }
  }

  async editLostPicture(lostId, fileLocation) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE lost_items SET picture_url = $1, updated_at = $2 WHERE id = $3 RETURNING id',
      values: [fileLocation, updatedAt, lostId],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui lost picture. Id tidak ditemukan');
    }
  }

  async editFoundPicture(foundId, fileLocation) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE found_items SET picture_url = $1, updated_at = $2 WHERE id = $3 RETURNING id',
      values: [fileLocation, updatedAt, foundId],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui found picture. Id tidak ditemukan');
    }
  }
}

module.exports = StorageService;
