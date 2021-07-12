import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as playlistAPI from '../../utilities/playlist-api';

export default function IndexPage({ user, myPlaylistPage, playlists, setPlaylists, allWines, setWine }) {
  const [userWines, setUserWines] = useState([])
  const [savedWines, setSavedWines] = useState([])
  const history = useHistory();

  useEffect(function () {
    async function getPlaylists() {
      const userPlaylists = await playlistAPI.getUserPlaylists();
      setPlaylists(userPlaylists);
    }
    setUserWines(allWines.filter(w => (
      w.playlists.some(p => p.user._id === user._id)
    )))
    setSavedWines(allWines.filter(w => (
      w.playlists.some(p => p.saved.some(u => u === user._id))
    )))
    getPlaylists();
  }, [allWines]);

  function handleDetails(wine) {
    let wineCopy = { ...wine }
    wineCopy.playlists = wineCopy.playlists.filter(p =>
    (myPlaylistPage ?
      p.user._id === user._id
      :
      p.saved.some(u => u === user._id)
    ))
    setWine(wineCopy);
    history.push("/results");
  }

  return (
    <>
      <div>{myPlaylistPage ? 'My Playlists' : 'Saved Playlists'}</div>
      <h1>IndexPage</h1>
      <br />
      {<div>
        {(myPlaylistPage ? userWines : savedWines).map(w => (
          <div>
            <button onClick={() => handleDetails(w)}>{w.title}</button>
            <hr />
          </div>
        ))}
      </div>}
      {/* <Link to="/home">
        <button>Create Playlist</button>
      </Link> */}
    </>
  );
}