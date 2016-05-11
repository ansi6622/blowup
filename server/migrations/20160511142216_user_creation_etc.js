
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
  table.increments();
  table.string('name');
  table.string('password');
  table.string('email');
  table.timestamp('created_at').defaultTo(knex.raw('now()'));
  table.boolean('admin').defaultTo('false');
  table.string('portrait_url');
  table.string('github_profile_url');
  table.text('biography');
  table.integer('theme_id').references('id').inTable('themes').onDelete('CASCADE').onUpdate('CASCADE');

})
.createTable('tags', function(table) {
  table.increments();
  table.string('name');
  table.string('description');
})
.createTable('oauth_services', function(table) {
  table.increments();
  table.string('name');
})
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users').dropTable('tags').dropTable('oauth_services').dropTable('themes');
};
