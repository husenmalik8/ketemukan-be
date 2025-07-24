const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const ServerError = require('../../exceptions/ServerError');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError'); // tambahkan ini jika belum ada

class FoundsService {
  constructor() {
    this._pool = new Pool();
  }

  async addFound({ title, shortDesc, description, foundDate, userId, categoryId, locationId }) {
    const id = `found-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const status = 'found';

    const query = {
      text: 'INSERT INTO found_items(id, title, short_desc, description, found_date, status, created_at, updated_at, user_id, category_id, location_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id',
      values: [
        id,
        title,
        shortDesc,
        description,
        foundDate,
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
      throw new InvariantError('Found item gagal ditambahkan');
    }

    return resultId;
  }

  async putFound(
    foundId,
    userId,
    {
      title,
      shortDesc,
      description,
      foundDate,
      status,
      longitude,
      latitude,
      categoryId,
      locationId,
    }
  ) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: `UPDATE found_items
              SET 
                title = $1,
                short_desc = $2,
                description = $3,
                found_date = $4,
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
        foundDate,
        status,
        longitude,
        latitude,
        updatedAt,
        categoryId,
        locationId,
        foundId,
        userId,
      ],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    if (!result.rowCount) {
      throw new InvariantError('Found item gagal diubah');
    }
  }

  async getFounds() {
    const query = {
      text: `SELECT 
                found_items.id,
                found_items.title,
                found_items.short_desc,
                found_items.picture_url,
                found_items.found_date,
                found_items.status,
                found_items.created_at,

                categories.name AS category_name,
                locations.name AS location_name
              FROM found_items
              LEFT JOIN categories ON found_items.category_id = categories.id
              LEFT JOIN locations ON found_items.location_id = locations.id;`,
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    return result.rows;
  }

  async getFoundById(id) {
    const query = {
      text: `SELECT 
                found_items.id,
                found_items.title,
                found_items.short_desc,
                found_items.description,
                found_items.picture_url,
                found_items.found_date,
                found_items.status,
                found_items.longitude,
                found_items.latitude,
                found_items.created_at,

                users.id AS user_id,
                users.username AS user_username,
                users.fullname AS user_fullname,
                users.picture_url AS user_picture_url,

                categories.name AS category_name,
                locations.name AS location_name

              FROM found_items
              LEFT JOIN categories ON found_items.category_id = categories.id
              LEFT JOIN locations ON found_items.location_id = locations.id
              LEFT JOIN users ON found_items.user_id = users.id
              WHERE found_items.id = $1;`,
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

  async getFoundCommentsByFoundId(foundItemId) {
    const query = {
      text: `SELECT 
                found_comments.comment,
                found_comments.created_at,
                users.id as user_id,
                users.username,
                users.fullname,
                users.picture_url
            FROM found_comments
            LEFT JOIN users ON found_comments.user_id = users.id
            WHERE found_comments.found_item_id = $1`,
      values: [foundItemId],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    return result.rows;
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

  async deleteFoundItemById(userId, foundId) {
    const query = {
      text: 'DELETE FROM found_items WHERE id = $1 AND user_id = $2 RETURNING id',
      values: [foundId, userId],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    if (!result.rows.length) {
      throw new NotFoundError('Found Item gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = FoundsService;
