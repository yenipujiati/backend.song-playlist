/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('playlists', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true
        },
        name: {
            type: 'TEXT',
            notNull: true
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
    pgm.dropTable('playlists');
};
