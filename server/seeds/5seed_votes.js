exports.seed = function(knex, Promise) {

  var posts_votesArr =
                  [{user_id: 2, post_id: 3},
                  {user_id: 3, post_id: 3},
                  {user_id: 1, post_id: 3}];


  return Promise.join(

  knex('posts_votes').insert(posts_votesArr)

  );
};
