import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as playlistAPI from '../../utilities/playlist-api';

export default function IndexPage({ user, myPlaylistPage, playlists, setPlaylists, allWines, userWines, setUserWines }) {
  
  useEffect(function(){
    async function getPlaylists(){
      const userPlaylists = await playlistAPI.getUserPlaylists();
      setPlaylists(userPlaylists);
    }
    setUserWines(allWines.filter(w => (
      w.playlists.some(p => p.user == user._id)
    )))
    getPlaylists();
  }, [ allWines ]);

  return (
    <>
      <div>{myPlaylistPage ? 'My Playlists' : 'Saved Playlists'}</div>
      <h1>IndexPage</h1>
      <br />
      {myPlaylistPage ? (
        <div>
          {userWines.map(w => (
            <div>
              <h1>Wine Title</h1>
              <h1>{w.title}</h1>
              <br />
              {w.playlists.map(p => (
                <>
                  <h1>playlist Title</h1>
                  <h1>{p.title}</h1>
                  <br />
                </>
              ))}
                <hr/>
            </div>
          ))}
          {/* {playlists.myPlaylists.map(p => (
            <p>{p.title}</p>
          ))} */}
        </div>
      ) : (
        <div></div>
      )}

      {/* <Link to="/home">
        <button>Create Playlist</button>
      </Link> */}
    </>
  );
}