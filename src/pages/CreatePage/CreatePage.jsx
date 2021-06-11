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

  async function handleAPIClick(evt) {
    const results = await playlistAPI.searchAPI({searchAPI})
    setResultsAPI(results)
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
        { resultsAPI && resultsAPI.map(result => 
          <div>{result.title}{result.artist.name}</div>
          ) }
      </div>
      <div>
        Saved songs button(delete)
      </div>
      <button>SAVE PLAYLIST</button>
    </>
  )
}