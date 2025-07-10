/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('lost_items', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },

    title: {
      type: 'TEXT',
      notNull: true,
    },
    short_desc: {
      type: 'TEXT',
      notNull: true,
    },
    description: {
      type: 'TEXT',
      notNull: true,
    },
    picture: {
      type: 'TEXT',
      notNull: false,
    },
    lost_date: {
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

    user_id: {
      type: 'TEXT',
      notNull: true,
    },
  });

  pgm.addConstraint(
    'lost_items',
    'fk_lost_items__user_id',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropTable('lost_items');
};
