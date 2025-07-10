/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('lost_comments', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },

    comment: {
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

    lost_item_id: {
      type: 'TEXT',
      notNull: true,
    },
    user_id: {
      type: 'TEXT',
      notNull: true,
    },
  });

  pgm.addConstraint(
    'lost_comments',
    'fk_lost_comments__lost_item_id',
    'FOREIGN KEY(lost_item_id) REFERENCES lost_items(id) ON DELETE CASCADE'
  );

  pgm.addConstraint(
    'lost_comments',
    'fk_lost_comments__user_id',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropTable('lost_comments');
};
