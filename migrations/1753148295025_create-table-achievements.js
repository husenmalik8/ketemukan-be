/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('achievements', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },

    name: {
      type: 'TEXT',
      notNull: true,
    },
    description: {
      type: 'TEXT',
      notNull: true,
    },
    picture_url: {
      type: 'TEXT',
      notNull: false,
    },
    condition_type: {
      type: 'TEXT',
      notNull: true,
    },
    condition_value: {
      type: 'INTEGER',
      notNull: true,
    },

    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('achievements');
};
