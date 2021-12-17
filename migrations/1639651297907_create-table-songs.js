/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('songs', {
        id : {
            type : 'VARCHAR(50)',
            primaryKey : true
        },
        title : {
            type : 'TEXT',
            notNull : true
        },
        year : {
            type : 'INTEGER',
            notNull: true
        },
        artist : {
            type : 'TEXT',
            notNull : true
        },
        gendre : {
            type : 'TEXT',
            notNull : true
        },
        duration : {
            type : 'TIME',
            notNull : true
        },
        createdAt : {
            type : 'TEXT',
            notNull : true
        },
        updateAt : {
            type : 'TEXT',
            notNull : true
        },
    });
};

exports.down = pgm => {
    pgm.dropTable('songs');
};
