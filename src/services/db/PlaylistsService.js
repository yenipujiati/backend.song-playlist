const {nanoid} = require("nanoid");
const {Pool} = require('pg');

class PlaylistsService {
    constructor() {
        this._pool = new Pool();
    }

    async addPlaylist({name}) {
        const id = 'playlists-' + nanoid(16);
        const createAt = new Date().toISOString();

        const query = {
            text: 'INSERT INTO playlists VALUES ($1,$2,$3,$4) RETURNING id',
            values: [id, name, createAt, createAt]
        }
        const result = await this._pool.query(query);
        if (!result.rows[0].id) {
            throw new Error('Playlist gagal ditambahkan');
        }
        return result.rows[0].id;
    }

    async getPlaylists() {
        const result = await this._pool.query('SELECT * FROM playlists');
        return result.rows;
    }

    async getPlaylistById(id) {
        const query = {
            text: 'SELECT * FROM playlists WHERE id=$1',
            values: [id]
        }
        const result = await this._pool.query(query);
        if (!result.rows[0].id) {
            throw new Error('Playlist gagal ditemukan');
        }
        return result.rows[0];
    }

    async addSongPlaylist(id, {song_id}) {
        const createdAt = new Date().toISOString();

        const query = {
            text : 'INSERT INTO playlist_songs VALUES ($1,$2,$3,$4,$5,$6) RETURNING id',
            values: [id,playlist_id,song_id,createdAt,createdAt]
        }

        const result = await this._pool.query(query);
        if (!result.rows[0].id){
            throw new Error("Gagal menambahkan lagu kedalam playlist");
        }
        return result.rows[0].id;
    }

    async getSongPlaylists(id) {
        const query = {
            text: 'SELECT * FROM playlist_songs WHERE id=$1',
            values: [id]
        }
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new Error('Tidak ada lagu di dalam playlist ini');
        }
        return result.rows[0];
    }
}

module.exports = PlaylistsService;