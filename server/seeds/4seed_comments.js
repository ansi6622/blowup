exports.seed = function(knex, Promise) {

  var tags_postsArr = [
    {tag_id: 3, post_id: 2},
    {tag_id: 2, post_id: 3},
    {tag_id: 1, post_id: 1},
    {tag_id: 4, post_id: 3},
    {tag_id: 5, post_id: 1},
    {tag_id: 6, post_id: 3},
    {tag_id: 6, post_id: 1}

  ]

  var commentsArr = [
    {body: 'FIrst.', user_id: 2, post_id: 1},
    {body: 'Yeah but you cant spell', user_id: 2, post_id: 1},
    {body: 'You guys suck.', user_id: 3, post_id: 1},
    {body: 'Im a real person.', user_id: 1, post_id: 1},
    {body: 'recaptcha is the dumbest sh** ive ever seen.', user_id: 3, post_id: 2},
    {body: 'Milk duds are alright with me', user_id: 2, post_id: 2}
  ]

  return Promise.join(

    knex('tags_posts').insert(tags_postsArr),
    knex('comments').insert(commentsArr)

  );
};
