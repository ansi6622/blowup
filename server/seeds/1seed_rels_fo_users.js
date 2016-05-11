exports.seed = function(knex, Promise) {

  var themesArr =
  [{name: 'dark', description: 'its for the dudes'},
  {name: 'light', description: 'its for if you like flowers'},
  {name: 'colorful', description: 'if you want an artsy musical theme'}];

  var tagsArr = [{name: 'javascript', description:'the javascript tag'},
                 {name: 'knex', description:'the knex tag'},
                 {name: 'node', description:'the node tag'},
                 {name: 'fun', description:'for stuff we enjoy'},
                 {name: 'fiction', description:'for stuff that is less than based in reality'},
                 {name: 'learning', description:'technically this should be everywhere'}];

  var oauth_servicesArr = [{name: 'Google'},
                           {name: 'Facebook'},
                           {name: 'Twitter'},
                         {name: 'LinkedIn'}];

  return Promise.join(
    // Deletes ALL existing entries
    knex.raw('TRUNCATE knex_migrations, oauth_services, posts, comments, posts_votes, themes, tags, tags_posts, users, users_oauth CASCADE'),
    knex.raw('ALTER SEQUENCE knex_migrations_id_seq RESTART'),
    knex.raw('ALTER SEQUENCE oauth_services_id_seq RESTART'),
    knex.raw('ALTER SEQUENCE posts_id_seq RESTART'),
    knex.raw('ALTER SEQUENCE comments_id_seq RESTART'),
    knex.raw('ALTER SEQUENCE themes_id_seq RESTART'),
    knex.raw('ALTER SEQUENCE tags_id_seq RESTART'),
    knex.raw('ALTER SEQUENCE users_id_seq RESTART'),

    // Inserts seed entries
    knex('themes').insert(themesArr),
    knex('tags').insert(tagsArr),
    knex('oauth_services').insert(oauth_servicesArr)
  );
};
