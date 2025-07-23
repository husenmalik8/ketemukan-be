const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const ServerError = require('../../exceptions/ServerError');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ username, password, fullname, locationId }) {
    await this.verifyNewUsername(username);
    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const points = 0;

    const query = {
      text: 'INSERT INTO users(id, username, password, fullname, created_at, updated_at, points, location_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [
        id,
        username,
        hashedPassword,
        fullname,
        createdAt,
        updatedAt,
        points,
        locationId,
      ],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    if (!result.rows.length) {
      throw new InvariantError('User gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    if (result.rows.length > 0) {
      throw new InvariantError(
        'Gagal menambahkan user. Username sudah digunakan.'
      );
    }
  }

  async editProfileUser(userId, { fullname, locationId }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE users SET fullname = $1, location_id = $2, updated_at = $3 WHERE id = $4 RETURNING id',
      values: [fullname, locationId, updatedAt, userId],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    if (!result.rows.length) {
      throw new InvariantError('User gagal di-edit');
    }
  }

  async getProfileUser(userId) {
    const query = {
      text: `SELECT 
                users.id,
                users.username,
                users.fullname,
                users.picture_url,
                users.points,
                users.created_at,

                locations.name AS location_name

            FROM users
            LEFT JOIN locations ON users.location_id = locations.id
            WHERE users.id = $1`,
      values: [userId],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    if (!result.rows.length) {
      throw new NotFoundError('User tidak ditemukan');
    }

    return result.rows[0];
  }

  async getMyLostItems(userId) {
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
              
              categories.name as category_name,
              locations.name as location_name
              
              FROM lost_items
              
              LEFT JOIN categories ON lost_items.category_id = categories.id
              LEFT JOIN locations ON lost_items.location_id = locations.id     
              
              WHERE lost_items.user_id = $1;`,
      values: [userId],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    if (!result.rows.length) {
      throw new InvariantError('Items tidak ditemukan');
    }

    return result.rows;
  }

  async getMyFoundItems(userId) {
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
              
              categories.name as category_name,
              locations.name as location_name
              
              FROM found_items
              
              LEFT JOIN categories ON found_items.category_id = categories.id
              LEFT JOIN locations ON found_items.location_id = locations.id     
              
              WHERE found_items.user_id = $1;`,
      values: [userId],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    if (!result.rows.length) {
      throw new InvariantError('Items tidak ditemukan');
    }

    return result.rows;
  }

  async getMyAchievements(userId) {
    const query = {
      text: `SELECT 
              achievements.name,
              achievements.description,
              achievements.condition_type,
              achievements.condition_value,
              achievements.picture_url
            FROM user_achievements
            LEFT JOIN achievements ON user_achievements.achievement_id = achievements.id
            WHERE user_achievements.user_id = $1;`,
      values: [userId],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    if (!result.rows.length) {
      throw new InvariantError('Achievement tidak ditemukan');
    }

    return result.rows;
  }
}

module.exports = UsersService;
