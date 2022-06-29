exports.seed = function(knex) {
    return knex('users').insert([
        {
            username: 'user1',
            password: 'user1',
            email: 'niushamjd@gmail.com'
        },
        {
            username: 'user2',
            password: 'user2',
            email: 'niyousha.mojoudi@ug.bilkent.edu.tr'
        }
    ]);
}