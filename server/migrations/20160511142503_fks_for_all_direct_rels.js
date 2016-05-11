
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(table) {
  table.increments('');
  table.text('body');
  table.string('title');
  table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
  table.timestamp('created_at').defaultTo(knex.raw('now()'));
})
.createTable('comments', function(table) {
  table.increments('');
  table.text('body');
  table.timestamp('created_at').defaultTo(knex.raw('now()'));
  table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
  table.integer('post_id').references('id').inTable('posts').onDelete('CASCADE').onUpdate('CASCADE');
})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts').dropTable('comments')
};
