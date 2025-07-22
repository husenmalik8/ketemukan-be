/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('categories', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },

    name: {
      type: 'TEXT',
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
  pgm.dropTable('categories');
};
