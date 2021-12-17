const {nanoid} = require('nanoid');
const songs = require('./songs');
const addSongHandler = (request,h) => {
    const {title, year, artist, gendre, duration} = request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updateAt = createdAt;

    const newSong = {
        title, year, artist, gendre, duration, id, createdAt, updateAt
    }
    songs.push(newSong);

    //mengecek proses push
    const isSuccess = songs.filter((song) => song.id === id).length > 0;
    if (isSuccess) {
        const response = h.response ({
            status : 'success',
            message : 'Lagu berhasil ditambahkan',
            data : {
                songId : id
            }
        });
        response.code(201);
        return response;
    }
    const response = h.response ({
        status : 'fail',
        message : 'Lagu gagal ditambahkan'
    });
    response.code(500);
    return response;

};

const getAllSongsHandler = () => ({
   status: 'success',
   data: {
       songs
   }
});

const getSongByIdHandler = (request,h) => {
    const {id} = request.params;
    //ambil data pertama/indeks[0] dari hasil filter
    const song = songs.filter((s) => s.id === id)[0];
    if (song !== undefined) {
        return {
            status: 'success',
            data: {
                song
            }
        }
    }
    const response = h.response ({
        status : 'fail',
        message : 'Lagu tidak ditemukan'
    });
    response.code(404);
    return response;
};

const editSongByIdHandler = (request,h) => {
    //get id dari parameter
  const {id} = request.params;
  //get title, year, artist, gendre, duration dari request body
  const {title, year, artist, gendre, duration} = request.payload;
  const updateAt = new Date().toISOString();

  const index = songs.findIndex((song) => song.id === id);

  if (index !== -1) {
      songs[index] = {
          ...songs[index],
          title,
          year,
          artist,
          gendre,
          duration,
          updateAt,
      }
      const response = h.response ({
          status : 'success',
          message : 'Lagu berhasil diubah',
          data : {
              songId : id
          }
      });
      response.code(200);
      return response;
  }
    const response = h.response ({
        status : 'fail',
        message : 'Lagu gagal diubah'
    });
    response.code(404);
    return response;
};

const deleteSongByIdHandler = (request,h) => {
    //get id dari parameter
    const {id} = request.params;
    const index = songs.findIndex((song) => song.id === id);
    if (index !== -1) {
    songs.splice(index, 1);
        const response = h.response ({
            status : 'success',
            message : 'Lagu berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    const response = h.response ({
        status : 'fail',
        message : 'Lagu gagal dihapus, lagu tidak ditemukan'
    });
    response.code(404);
    return response;
}

module.exports = {addSongHandler, getAllSongsHandler,getSongByIdHandler,editSongByIdHandler, deleteSongByIdHandler};