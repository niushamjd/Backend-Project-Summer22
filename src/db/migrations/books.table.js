exports.up = function (knex) {
    return knex.schema.createTable('books', function (table) {
        table.increments('bookId').primary();
        table.string('title').notNullable();
        table.string('author').notNullable();
       
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('books');
}   
