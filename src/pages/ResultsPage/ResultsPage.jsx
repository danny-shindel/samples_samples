import { useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as winesAPI from '../../utilities/wines-api';
import "./ResultsPage.css";

export default function ResultsPage({ user, setClick, wine, setWine, myPlaylistPage, setPlaylist, setEdit }) {
  const history = useHistory();

  function handleClick() {

  }

  useEffect(function() {
    if (!wine) {
      setWine(JSON.parse(localStorage.getItem('wine')));
      console.log("RIGHT HERE");
    }
  }, [])

  async function savePlaylist(playlistId) {
    if (user) {
      const updateData = {
        'playlistId': playlistId
      }
      const updatedWine = await winesAPI.addSavedPlaylist(updateData, wine._id);
      setWine(updatedWine);
    } else {
      // routes back to results page
      setClick(1);
      history.push('/auth');
    }
  }

  async function editPlaylist(playlist) {
    setEdit(true);
    setPlaylist(playlist);
    history.push('/create');
  }

  function handleCreateClick() {
    setPlaylist({
      title: "",
      about: "",
      songs: []
    });
    setEdit(false)
  }

    return (
    <div className="columns">
      <div className="column is-5">
        <p>
          {wine && wine.title}
        </p>
      </div>
      <div className="column is-7">
        {wine && wine.playlists.map(playlist => (
          <>
            <div>User: {playlist.user.name}</div>
            <div>Title: {playlist.title}</div>
            <div>About: {playlist.about || "nothing here mate"}</div>
            <div>Songs:</div>
            {playlist.songs.map(song => (
              <>
                <h3>{song.title} - {song.artist.name}</h3>
              </>
            ))}
            {myPlaylistPage ?
              <button className="button" onClick={() => editPlaylist(playlist)}>
                Edit
              </button>
              :
              <button onClick={() => savePlaylist(playlist._id)}>
                {playlist.saved.find(userId => userId === user._id) ? 'saved' : 'save playlist'}
              </button>
            }
            <hr />
          </>
        ))}
        <h1>ResultsPage</h1>
        {user ?
          <>
            <Link to='/create'><button onClick={handleCreateClick}>CreatePlaylist</button></Link>
          </>
          :
          <>
            <Link to='/auth'><button onClick={() => setClick(2)}>Create Play (login)</button></Link>
          </>
        }
      </div>
    </div>
  )
}