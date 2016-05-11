
exports.up = function(knex, Promise) {
  return knex.schema
.createTable('posts_votes', function(table) {
  table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
  table.integer('post_id').references('id').inTable('posts').onDelete('CASCADE').onUpdate('CASCADE');
})
.createTable('users_oauth', function(table) {
  table.integer('oauth_services_id').references('id').inTable('oauth_services').onDelete('CASCADE').onUpdate('CASCADE');
  table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
  table.string('oauth_given_id');
})
.createTable('tags_posts', function(table) {
  table.integer('tag_id').references('id').inTable('tags').onDelete('CASCADE').onUpdate('CASCADE');
  table.integer('post_id').references('id').inTable('posts').onDelete('CASCADE').onUpdate('CASCADE');
})
.createTable('tags_users', function(table) {
  table.integer('tag_id').references('id').inTable('tags').onDelete('CASCADE').onUpdate('CASCADE');
  table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
})
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('posts_votes').dropTable('users_oauth').dropTable('tags_posts').dropTable('tags_users');
};
