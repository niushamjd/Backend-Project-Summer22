exports.seed = function(knex) {
    return knex('books').insert([
        {
            title: 'The Lord of the Rings',
            author: 'J.R.R. Tolkien'
        },
        {
            title: 'The Hobbit',
            author: 'J.R.R. Tolkien'
        },
        {
            title: 'Harry Potter and the Order of the Phoenix',
            author: 'J.K. Rowling'
        },
        {
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald'
        },
        {
            title: 'The Da Vinci Code',
            author: 'Dan Brown'
        },
        {
            title: 'Little Women',
            author: 'Louisa May Alcott'
        }
    ]);
}
