exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('userId').primary();
        table.string('username').unique().notNullable();
        table.string('password').notNullable();
        table.string('email').unique().notNullable();
    });
}
exports.down = function (knex) {
    return knex.schema.dropTable('users');
}   