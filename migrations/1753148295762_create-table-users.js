/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },

    username: {
      type: 'TEXT',
      unique: true,
      notNull: true,
    },
    password: {
      type: 'TEXT',
      notNull: true,
    },
    fullname: {
      type: 'TEXT',
      notNull: true,
    },
    picture_url: {
      type: 'TEXT',
      notNull: false,
    },
    points: {
      type: 'INTEGER',
      notNull: false,
    },

    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    },

    location_id: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
