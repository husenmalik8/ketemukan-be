/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('found_comments', {
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

    found_item_id: {
      type: 'TEXT',
      notNull: true,
    },
    user_id: {
      type: 'TEXT',
      notNull: true,
    },
  });

  pgm.addConstraint(
    'found_comments',
    'fk_found_comments__found_item_id',
    'FOREIGN KEY(found_item_id) REFERENCES found_items(id) ON DELETE CASCADE'
  );

  pgm.addConstraint(
    'found_comments',
    'fk_found_comments__user_id',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropTable('found_comments');
};
