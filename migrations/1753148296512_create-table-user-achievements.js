/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('user_achievements', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },

    user_id: {
      type: 'TEXT',
      notNull: true,
    },
    achievement_id: {
      type: 'TEXT',
      notNull: true,
    },

    created_at: {
      type: 'TEXT',
      notNull: true,
    },
  });

  pgm.addConstraint(
    'user_achievements',
    'fk_user_achievements__user_id',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE'
  );

  pgm.addConstraint(
    'user_achievements',
    'fk_user_achievements__achievement_id',
    'FOREIGN KEY(achievement_id) REFERENCES achievements(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropTable('user_achievements');
};
