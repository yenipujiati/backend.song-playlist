/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('playlist_songs', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true
        },
        playlist_id: {
            type: 'VARCHAR(50)',
            foreignKeys: true,
            columns: 'id',
            references: 'playlists'
        },
        song_id: {
            type: 'VARCHAR(50)',
            foreignKeys: true,
            columns: 'id',
            references: 'songs'
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
    pgm.dropTable('playlist_songs');
};
