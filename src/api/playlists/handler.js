class PlaylistsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.addPlaylistHandler = this.addPlaylistHandler.bind(this);
        this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
        this.getPlaylistByIdHandler = this.getPlaylistByIdHandler.bind(this);
    }

    async addPlaylistHandler(request,h) {
        try{
            this._validator.validatePlaylistPayload(request.payload);
            const {name} = request.payload;
            const playlistId = await this._service.addPlaylist({name});
            const response = h.response ({
               status: 'success',
               message: 'Playlist berhasil ditambahkan',
                data: {
                    playlistId
                },
            });
            response.code(201);
            return response;
        }catch (e) {
            const response = h.response ({
               status: 'fail',
               message: e.message
            });
            response.code(400);
            return response;
        }
    }

    async getPlaylistsHandler() {
        const playlists = await this._service.getPlaylists();
        return {
            status: 'success',
            data: {
                playlists
            }
        };
    };

    async getPlaylistByIdHandler(request,h) {
        try{
            const {id} = request.params;
            const playlist = await this._service.getPlaylistById(id);
            return {
                status: 'success',
                data: {
                    playlist
                }
            };
        }catch (e) {
            const response = h.response({
                status: 'fail',
                message: e.message,
            });
            response.code(404);
            return response;
        }
    }

    async addSongPlaylistHandler(request,h) {
        try {
            const {id} = request.params;
            const {song_id} = request.payload;
            this._service = 'undefined';
            const playlistSongId = await this._service.addSongPlaylist(id, {song_id});
            const response = h.response ({
               status: 'success',
               message: 'Lagu Berhasil ditambahkan kedalam playlist',
               data: {
                   playlistSongId : playlistSongId
               }
            });
            response.code(201);
            return response;
        }catch (e) {
            const response = h.response ({
                status: 'fail',
                message: e.message
            });
            response.code(400);
            return response;
        }
    }

    async getSongPlaylistsHandler(request,h) {
        try {
            const {id} = request.params;
            const songplaylists = await this._service.getSongPlaylists(id);
            return {
                status: 'success',
                data: {
                    songplaylists
                }
            };
        }catch (e) {
            const response = h.response({
                status: 'fail',
                message: e.message,
            });
            response.code(404);
            return response;
        }
    }
}

module.exports = PlaylistsHandler;