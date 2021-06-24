import { Link, useHistory } from 'react-router-dom';
import * as winesAPI from '../../utilities/wines-api';

export default function ResultsPage({ user, setClick, wine, setWine }) {
  const history = useHistory();

  function handleClick() {

  }

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

  return (
    <div>
      <div>{wine && wine.title}</div>
      {wine.playlists.map(playlist => (
        <>
          <div>User:</div>
          <div>{playlist.user.name}</div>
          <div>Title:</div>
          <div>{playlist.title}</div>
          <div>About:</div>
          <p>{playlist.about}</p>
          <div>Songs:</div>
          {playlist.songs.map(song => (
            <>
              <p>{song.title} - {song.artist.name}</p>
            </>
          ))}
          <button onClick={() => savePlaylist(playlist._id)}>
            {playlist.saved.find(userId => userId === user._id) ? 'saved' : 'save playlist'}
          </button>
          <hr />
        </>
      ))}

      <h1>ResultsPage</h1>
      {user ?
        <>
          <Link to='/create'><button>CreatePlaylist</button></Link>
        </>
        :
        <>
          <Link to='/auth'><button onClick={() => setClick(2)}>Create Play (login)</button></Link>
        </>
      }
    </div>
  )
}