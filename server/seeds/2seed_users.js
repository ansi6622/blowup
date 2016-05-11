exports.seed = function(knex, Promise) {

  var usersArr = [{ name: 'Anthony Black', password: 'slackoverflow', email: 'black.jack@gmail.com', admin: true, portrait_url: 'https://robohash.org/104.26.21.14.png/sdsdgfdf', github_profile_url: 'https://github.com/Johnish', biography: 'Student at Galvanize', theme_id: 1},
        { name: 'Anthony Simpson', password: 'slackoverflow', email: 'ansi6622@colorado.edu', admin: true, portrait_url: 'https://robohash.org/anthodwqny', github_profile_url: 'https://github.com/FredH', biography: 'Student at Galvanize', theme_id: 1},
        { name: 'ike tomolak', password: 'slackoverflow', email: 'mhom@oasdmail.com', admin: true, portrait_url: 'https://robohash.org/romopolak', github_profile_url: 'https://github.com/robolots', biography: 'Student at Galvanize', theme_id: 3},
        { name: 'Courtney Morrissey', password: 'slackoverflow', email: 'courtneycmorrissey@gmail.com', admin: true, portrait_url: 'https://robohash.org/asdasdadv', github_profile_url: 'https://github.com/FreemanJamesH', biography: 'On the weekends we run with the wolves', theme_id: 2 }
      ];

  return Promise.join(

    knex('users').insert(usersArr)
  );
};
