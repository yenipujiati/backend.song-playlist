const {nanoid} = require("nanoid");
const {Pool} = require('pg');

class SongsService {
    constructor() {
        this._pool = new Pool();
    }

    async addSong({title, year, artist, gendre, duration}) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updateAt = createdAt;

        const query = {
            text : 'INSERT INTO songs VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id',
            values: [id,title,year,artist,gendre,duration,createdAt,createdAt]
        }

        const result = await this._pool.query(query);
        if (!result.rows[0].id){
            throw new Error("Lagu gagal ditambahkan");
        }
        return result.rows[0].id;
    }

    async getSongs(){
        const result = await this._pool.query('SELECT * FROM songs');
        return result.rows;
    }

    async getSongById(id) {
        const query = {
            text: 'SELECT * FROM songs where id=$1',
            values: [id]
        }
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new Error('Lagu tidak ditemukan');
        }
        return result.rows[0];
    }

    async editSongById(id, {title, year, artist, gendre, duration}) {
        const updateAt = new Date().toISOString();
        const query = {
            text: 'UPDATE songs SET title=$1,year=$2,artist=$3,gendre=$4,duration=$5 WHERE id=$6 RETURNING id',
            values: [title,year,artist,gendre,duration,id]
        }
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new Error('Gagal memperbaharui lagu, lagu tidak ditemukan');
        }
    }

    async deleteSongById(id) {
        const query = {
            text: 'DELETE FROM songs WHERE id=$1 RETURNING id',
            values: [id]
        }
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new Error('Gagal menghapus lagu, lagu tidak ditemukan');
        }
    }

}

module.exports = SongsService;