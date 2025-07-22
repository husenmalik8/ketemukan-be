const { Pool } = require('pg');
const ServerError = require('../../exceptions/ServerError');
const InvariantError = require('../../exceptions/InvariantError');
const { nanoid } = require('nanoid');

class CategoriesService {
  constructor() {
    this._pool = new Pool();
  }

  async getCategories() {
    const result = await this._pool
      .query('SELECT id, name FROM categories')
      .catch((error) => {
        console.error(error);
        throw new ServerError('Internal server error');
      });

    return result.rows;
  }

  async addCategory({ name }) {
    const id = `category-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO categories(id, name, created_at, updated_at) VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, name, createdAt, updatedAt],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    const resultId = result.rows[0].id;

    if (!resultId) {
      throw new InvariantError('Kategori gagal ditambahkan');
    }

    return resultId;
  }

  async deleteCategory(id) {
    const query = {
      text: 'DELETE FROM categories WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    if (!result.rowCount) {
      throw new InvariantError('Kategori gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = CategoriesService;
