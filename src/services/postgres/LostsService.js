const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const ServerError = require('../../exceptions/ServerError');
const InvariantError = require('../../exceptions/InvariantError');

class LostsService {
  constructor() {
    this._pool = new Pool();
  }

  async addLost({
    title,
    shortDesc,
    description,
    lostDate,
    userId,
    categoryId,
    locationId,
  }) {
    const id = `lost-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const status = 'lost';

    const query = {
      text: 'INSERT INTO lost_items(id, title, short_desc, description, lost_date, status, created_at, updated_at, user_id, category_id, location_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id',
      values: [
        id,
        title,
        shortDesc,
        description,
        lostDate,
        status,
        createdAt,
        updatedAt,
        userId,
        categoryId,
        locationId,
      ],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    const resultId = result.rows[0].id;

    if (!resultId) {
      throw new InvariantError('Lost item gagal ditambahkan');
    }

    return resultId;
  }

  async getLosts() {
    const query = {
      text: 'SELECT id, title, short_desc, picture, lost_date FROM lost_items',
    };

    id;
    title;
    short_desc;
    picture_url;
    lost_date;
    status;
    created_at;
    category_id;
    location_id;

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    return result.rows;
  }

  async getLostById(id) {
    const query = {
      text: 'SELECT id, title, short_desc, description, picture, lost_date FROM lost_items WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    if (!result.rows.length) {
      throw new NotFoundError('Lost item tidak ditemukan');
    }

    return result.rows[0];
  }

  async getLostCommentsByLostId(lostItemId) {
    const query = {
      text: `SELECT 
                lost_comments.comment,
                lost_comments.created_at,
                users.id as user_id,
                users.username,
                users.fullname,
                users.profile_picture
            FROM lost_comments
            LEFT JOIN users ON lost_comments.user_id = users.id
            WHERE lost_comments.lost_item_id = $1`,
      values: [lostItemId],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    return result.rows;
  }

  async addLostComment({ comment, lostId, userId }) {
    const id = `lost-comment-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO lost_comments(id, comment, created_at, updated_at, lost_item_id, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, comment, createdAt, updatedAt, lostId, userId],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    const resultId = result.rows[0].id;

    if (!resultId) {
      throw new InvariantError('Lost item gagal ditambahkan');
    }

    return resultId;
  }

  async verifyLostItem(id) {
    const query = {
      text: 'SELECT id FROM lost_items WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    if (!result.rows.length) {
      throw new NotFoundError('Lost item tidak ditemukan');
    }
  }
}

module.exports = LostsService;
