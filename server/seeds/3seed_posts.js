exports.seed = function(knex, Promise) {


  var postsArr = [
    {title: 'A first Post', body: 'We want to know how low you can go', user_id: 1},
    {title: 'Hello Cleveland', body: 'Shouts out to mike homolak, kid cudi, and all the other cheeseheads out there', user_id: 2},
    {title: 'Just nod if you can hear me', body: 'A question. A very good question. But there will be no answer', user_id: 2}
  ]

  var tags_usersArr = [
    {user_id: 1, tag_id:3},
    {user_id: 1, tag_id:6},
    {user_id: 2, tag_id:2},
    {user_id: 3, tag_id:1},
    {user_id: 3, tag_id:3},
    {user_id: 3, tag_id:2},
    {user_id: 2, tag_id:5},
    {user_id: 2, tag_id:4}

  ]

  var users_oauthArr = [
    {oauth_services_id: 1, user_id: 2},
    {oauth_services_id: 2, user_id: 1},
    {oauth_services_id: 3, user_id: 3}
  ]

  return Promise.join(

    knex('posts').insert(postsArr),
    knex('tags_users').insert(tags_usersArr),
    knex('users_oauth').insert(users_oauthArr)

  );
};
