const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'Sanjeev@123',
        database: 'resume',
        charset: 'utf8'
    }
});
const bookshelf = require('bookshelf')(knex)

// Defining models
const Position = bookshelf.Model.extend({
    tableName: 'position_name'
});

const Manager = bookshelf.Model.extend({
    tableName: 'loginmng'
});

const Applicant = bookshelf.Model.extend({
    tableName: 'applicants'          
});
        
exports._bookshelf = bookshelf;
exports.Applicant = Applicant;
exports.Manager = Manager;
exports.Position = Position;

