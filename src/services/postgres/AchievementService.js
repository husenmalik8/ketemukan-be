const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const ServerError = require('../../exceptions/ServerError');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class AchievementService {
  constructor() {
    this._pool = new Pool();
  }

  async countUserLostOrFoundItems(table, userId) {
    let query = {};
    switch (table) {
      case 'lost_items':
        query = {
          text: `SELECT COUNT(*)::int AS count FROM lost_items WHERE user_id = $1`,
          values: [userId],
        };
        break;
      case 'found_items':
        query = {
          text: `SELECT COUNT(*)::int AS count FROM found_items WHERE user_id = $1`,
          values: [userId],
        };
        break;

      default:
        throw new ServerError(`Invalid table name: ${table}`);
    }

    const { rows } = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    return rows[0].count;
  }

  async countUserComments(userId) {
    const queryFoundComments = {
      text: `SELECT COUNT(*)::int AS count FROM found_comments WHERE user_id = $1`,
      values: [userId],
    };
    const { rows: foundComments } = await this._pool
      .query(queryFoundComments)
      .catch((error) => {
        console.error(error);
        throw new ServerError('Internal server error');
      });

    const queryLostComments = {
      text: `SELECT COUNT(*)::int AS count FROM lost_comments WHERE user_id = $1`,
      values: [userId],
    };
    const { rows: lostComments } = await this._pool
      .query(queryLostComments)
      .catch((error) => {
        console.error(error);
        throw new ServerError('Internal server error');
      });

    const totalComment = lostComments[0].count + foundComments[0].count;

    return totalComment;
  }

  async checkAndGiveAchievement(userId) {
    const id = `user_achievement-${nanoid(16)}`;
    const createdAt = new Date().toISOString();

    const query = {
      text: 'SELECT id, name, condition_type, condition_value FROM achievements',
    };
    const { rows: allAchievements } = await this._pool
      .query(query)
      .catch((error) => {
        console.error(error);
        throw new ServerError('Internal server error');
      });

    const query2 = {
      text: 'SELECT achievement_id FROM user_achievements WHERE user_id = $1',
      values: [userId],
    };
    const { rows: userAchievements } = await this._pool
      .query(query2)
      .catch((error) => {
        console.error(error);
        throw new ServerError('Internal server error');
      });

    const userAchievementIds = userAchievements.map(
      (row) => row.achievement_id
    );

    for (const achievement of allAchievements) {
      if (userAchievementIds.includes(achievement.id)) continue;

      let userCount = 0;

      switch (achievement.condition_type) {
        case 'lost_items':
          userCount = await this.countUserLostOrFoundItems(
            'lost_items',
            userId
          );
          break;
        case 'found_items':
          userCount = await this.countUserLostOrFoundItems(
            'found_items',
            userId
          );
          break;
        case 'comments':
          userCount = await this.countUserComments(userId);
          break;
        default:
          continue;
      }

      if (userCount >= achievement.condition_value) {
        await this._pool.query(
          'INSERT INTO user_achievements (id, user_id, achievement_id, created_at) VALUES ($1, $2, $3, $4)',
          [id, userId, achievement.id, createdAt]
        );
      }
    }
  }
}

module.exports = AchievementService;
