import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as playlistAPI from '../../utilities/playlist-api';

export default function IndexPage({ user, myPlaylist }) {
  
  useEffect(function(){
    async function getPlaylists(){
      const playlists = await playlistAPI.getUserPlaylists();
      console.log(playlists)
    }
    getPlaylists();
  }, [])

  return (
    <>
      <div>{myPlaylist ? 'My Playlist' : 'Saved'}</div>
      <h1>IndexPage</h1>
      <Link to="/playlist">
        <button>Create Playlist</button>
      </Link>
    </>
  );
}