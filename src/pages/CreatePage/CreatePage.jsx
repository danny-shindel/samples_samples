import { useState } from 'react';
import * as playlistAPI from '../../utilities/playlist-api'

export default function CreatePage({ user }) {
  const [playlist, setPlaylist] = useState({
    title: "",
    about:"",
    songs: []
  })
  const [searchAPI, setSearchAPI] = useState('')
  const [resultsAPI, setResultsAPI] = useState(null)

  function handleChange(evt) {
    setPlaylist({...playlist, [evt.target.name]: evt.target.value})
  }

  function handleAPIChange(evt) {
    setSearchAPI(evt.target.value)
  }

  async function handleAPIClick() {
    const results = await playlistAPI.searchAPI({searchAPI})
    setResultsAPI(results)
  }

  function addToPlaylist(result){
    const newSongs = [...playlist.songs];
    newSongs.push(result);
    setPlaylist({...playlist, songs: newSongs});
  }

  function deleteFromPlaylist(idx){
    const newSongs = [...playlist.songs];
    newSongs.splice(idx, 1);
    setPlaylist({...playlist, songs: newSongs});
  }




  return(
    <>
      <h1>Create Playlist</h1>
      <input placeholder="title" name="title" onChange={handleChange}></input>
      <br/>
      <textarea onChange={handleChange} name="about"></textarea>
      <br/>
      <input placeholder="song/album/artist search" onChange={handleAPIChange} name="searchAPI"></input>
      <button onClick={handleAPIClick}>search song</button>
      <div>
        { resultsAPI && resultsAPI.map((result, idx) =>
        <> 
          <div>{result.title} {result.artist.name}</div>
          <button onClick={() => addToPlaylist(result)}>ADD</button>
        </>
          )}
      </div>
      <div>
      { (playlist.songs.length > 0) && playlist.songs.map((song, idx) =>
        <> 
          <div>{song.title} {song.artist.name}</div>
          <button onClick={() => deleteFromPlaylist(idx)}>Delete</button>
        </>
          )}
      </div>
      <button>SAVE PLAYLIST</button>
    </>
  )
}