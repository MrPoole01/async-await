const {rating, album: album_name, artist, year, artwork_url} = album;

{
  rating: 10,
  album: 'Dive',
  artist: 'Tycho',
  year: '~2005',
  artwork_url: 'http:////',
  genres: ['idm', 'chillwave']
}

return knex('album').insert({
    rating,
    album: album_name,
    artist,
    year,
    artwork_url
  }, '*').then(results => {
    const createdAlbum = results[0];
    const album_id = createdAlbum.id;

    return knex('genre')
      .whereIn('genre_name', album.genres)
      .pluck('id')
      .then(genreIds => {
        return {
          createdAlbum,
          album_id,
          genreIds
        }
      });
  }).then(result => {
    const {album_id, genreIds, createdAlbum} = result;
    const album_genres = genreIds.map(genre_id => {
      return {
        album_id,
        genre_id
      }
    });

    return knex('album_genre')
      .insert(album_genres)
      .then(() => {
        createdAlbum.genres = album.genres;
        return createdAlbum;
      })
  });


const results = await knex('album').insert({
  rating,
  album: album_name,
  artist,
  year,
  artwork_url
}, '*')

const createdAlbum = results[0];
const album_id = createdAlbum.id;

const genreIds = await knex('genre')
  .whereIn('genre_name', album.genres)
  .pluck('id');

const album_genres = genreIds.map(genre_id => {
  return {
    album_id,
    genre_id
  }
});

const results = await knex('album_genre')
  .insert(album_genres);

createdAlbum.genres = album.genres;

return createdAlbum;
