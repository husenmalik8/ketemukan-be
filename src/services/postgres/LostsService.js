const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const ServerError = require('../../exceptions/ServerError');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class LostsService {
  constructor() {
    this._pool = new Pool();
  }

  async addLost({ title, shortDesc, description, lostDate, userId, categoryId, locationId }) {
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

  async putLost(
    lostId,
    userId,
    { title, shortDesc, description, lostDate, status, longitude, latitude, categoryId, locationId }
  ) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: `UPDATE lost_items
              SET 
                title = $1,
                short_desc = $2,
                description = $3,
                lost_date = $4,
                status = $5,
                longitude = $6,
                latitude = $7,
                updated_at = $8,
                category_id = $9,
                location_id = $10
              WHERE id = $11 AND user_id = $12
              RETURNING id;`,
      values: [
        title,
        shortDesc,
        description,
        lostDate,
        status,
        longitude,
        latitude,
        updatedAt,
        categoryId,
        locationId,
        lostId,
        userId,
      ],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    if (!result.rowCount) {
      throw new InvariantError('Lost item gagal diubah');
    }
  }

  async getLosts() {
    const query = {
      text: `SELECT 
                lost_items.id,
                lost_items.title,
                lost_items.short_desc,
                lost_items.picture_url,
                lost_items.lost_date,
                lost_items.status,
                lost_items.created_at,

                categories.name AS category_name,
                locations.name AS location_name
              FROM lost_items
              LEFT JOIN categories ON lost_items.category_id = categories.id
              LEFT JOIN locations ON lost_items.location_id = locations.id;`,
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    return result.rows;
  }

  async getLostById(id) {
    const query = {
      text: `SELECT 
                lost_items.id,
                lost_items.title,
                lost_items.short_desc,
                lost_items.description,
                lost_items.picture_url,
                lost_items.lost_date,
                lost_items.status,
                lost_items.longitude,
                lost_items.latitude,
                lost_items.created_at,

                users.id AS user_id,
                users.username AS user_username,
                users.fullname AS user_fullname,
                users.picture_url AS user_picture_url,

                categories.name AS category_name,
                locations.name AS location_name

              FROM lost_items
              LEFT JOIN categories ON lost_items.category_id = categories.id
              LEFT JOIN locations ON lost_items.location_id = locations.id
              LEFT JOIN users ON lost_items.user_id = users.id
              WHERE lost_items.id = $1;`,
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
                users.picture_url
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

  async deleteLostItemById(userId, lostId) {
    const query = {
      text: 'DELETE FROM lost_items WHERE id = $1 AND user_id = $2 RETURNING id',
      values: [lostId, userId],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    if (!result.rows.length) {
      throw new NotFoundError('Lost Item gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = LostsService;
