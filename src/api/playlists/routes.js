const routes = (handler) => [
    {
        method: 'POST',
        path: '/playlists',
        handler: handler.addPlaylistHandler,
    },
    {
        method: 'GET',
        path: '/playlists',
        handler: handler.getPlaylistsHandler,
    },
    {
        method: 'GET',
        path: '/playlists/{id}',
        handler: handler.getPlaylistByIdHandler,
    },
    {
        method: 'POST',
        path: '/playlists/{id}/songs',
        handler: handler.addSongPlaylistHandler,
    },
    {
        method: 'GET',
        path: '/playlists/{id}/songs',
        handler: handler.getSongPlaylistsHandler,
    },
];

module.exports = routes;