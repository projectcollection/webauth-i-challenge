
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('users', (col) => {
            col.increments()

            col.string('firstName').notNullable()

            col.string('lastName').notNullable()

            col.string('username').notNullable().unique()

            col.string('password').notNullable()
        })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('users')
};
