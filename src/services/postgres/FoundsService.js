const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const ServerError = require('../../exceptions/ServerError');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError'); // tambahkan ini jika belum ada

class FoundsService {
  constructor() {
    this._pool = new Pool();
  }

  async addFound({ title, shortDesc, description, foundDate, userId }) {
    const id = `found-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO found_items(id, title, short_desc, description, found_date, created_at, updated_at, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [
        id,
        title,
        shortDesc,
        description,
        foundDate,
        createdAt,
        updatedAt,
        userId,
      ],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    const resultId = result.rows[0].id;

    if (!resultId) {
      throw new InvariantError('Found item gagal ditambahkan');
    }

    return resultId;
  }

  async getFounds() {
    const query = {
      text: 'SELECT id, title, short_desc, picture, found_date FROM found_items',
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    return result.rows;
  }

  async getFoundById(id) {
    const query = {
      text: 'SELECT id, title, short_desc, description, picture, found_date FROM found_items WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    if (!result.rows.length) {
      throw new NotFoundError('Found item tidak ditemukan');
    }

    return result.rows[0];
  }

  async addFoundComment({ comment, foundId, userId }) {
    const id = `found-comment-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO found_comments(id, comment, created_at, updated_at, found_item_id, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, comment, createdAt, updatedAt, foundId, userId],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    const resultId = result.rows[0]?.id;

    if (!resultId) {
      throw new InvariantError('Komentar item ditemukan gagal ditambahkan');
    }

    return resultId;
  }

  async verifyFoundItem(id) {
    const query = {
      text: 'SELECT id FROM found_items WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    if (!result.rows.length) {
      throw new NotFoundError('Found Item tidak ditemukan');
    }
  }

  // TODO
  async verifyFoundItemOwner({ foundId, userId }) {
    // TODO
  }
}

module.exports = FoundsService;
