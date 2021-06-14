import { Link } from 'react-router-dom';

export default function ResultsPage({ user, setClick, wine }) {

  function handleClick() { 

  }

  return(
  <div>
    <div>{wine && wine.title}</div>
      {wine.playlists.map(playlist => (
        <>
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
        <button>Save Playlist</button>
        <hr/>
        </>
      ))}

    <h1>ResultsPage</h1>
    { user ?
    <>
      <button >Save</button>
      <Link to='/create'><button>CreatePlaylist</button></Link>
    </>
    :
    <>
      <Link to='/auth'><button onClick={() => setClick(1)}>Save (login)</button></Link>
      <Link to='/auth'><button onClick={() => setClick(2)}>Create Play (login)</button></Link>
    </>
    }
  </div>
  ) 
}