import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as playlistAPI from '../../utilities/playlist-api'
import * as wineAPI from '../../utilities/wines-api'
import "./CreatePage.css";

export default function CreatePage({ wine, setAllWines, playlist, setPlaylist, setEdit }) {
  const history = useHistory();
  const [searchAPI, setSearchAPI] = useState('')
  const [resultsAPI, setResultsAPI] = useState(null)

  function handleChange(evt) {
    setPlaylist({ ...playlist, [evt.target.name]: evt.target.value })
  }

  function handleAPIChange(evt) {
    setSearchAPI(evt.target.value)
  }

  async function handleAPIClick() {
    const results = await playlistAPI.searchAPI({ searchAPI })
    setResultsAPI(results)
  }

  function addToPlaylist(result) {
    const newSongs = [...playlist.songs];
    newSongs.push(result);
    setPlaylist({ ...playlist, songs: newSongs });
  }

  function deleteFromPlaylist(idx) {
    const newSongs = [...playlist.songs];
    newSongs.splice(idx, 1);
    setPlaylist({ ...playlist, songs: newSongs });
  }

  async function handleSavePlaylist() {
    const newPlaylist = await playlistAPI.create(playlist);
    const wines = await wineAPI.addPlaylist(wine, newPlaylist);
    setAllWines(wines)
    history.push('/index');
  }

  async function handleUpdatePlaylist() {
    const updatedPlaylist = await playlistAPI.update(playlist);
    const wines = await wineAPI.getAll();
    setEdit(false)
    setAllWines(wines)
    history.push('/index');
  }

  async function handleDeletePlaylist() {
    const deletePlaylist = await playlistAPI.deletePlaylist(playlist._id);
    const wines = await wineAPI.getAll();
    setEdit(false)
    setAllWines(wines)
    history.push('/index');
  }

  return (
    <>
    <div className="columns">
        <div className="column is-5">
            <img src="https://i.imgur.com/8upb3GM.png"></img>
      </div>
      <div className="column is-7">
          <div className="is-pulled-left">
        <input placeholder="title" name="title" onChange={handleChange} value={playlist.title}></input>
        </div>
          <div className="is-pulled-left">
        <textarea className="is-pulled-left" onChange={handleChange} name="about" value={playlist.about}></textarea>
        </div>
      </div>
    </div>
    <div className="columns">
      <div className="column is-6">
        <div><input placeholder="song/album/artist search" onChange={handleAPIChange} name="searchAPI"></input>
          <button onClick={handleAPIClick}>search song</button></div>
        {resultsAPI && resultsAPI.map((result, idx) =>
          <>
            <div>{result.title} {result.artist.name}</div>
            <button onClick={() => addToPlaylist(result)}>ADD</button>
          </>
        )}
      </div>
      <div className="column is-6">
        {(playlist.songs.length > 0) && playlist.songs.map((song, idx) =>
          <>
            <div>{song.title} {song.artist.name}</div>
            <button onClick={() => deleteFromPlaylist(idx)}>Delete</button>
          </>
        )}
      </div>
      <button onClick={playlist._id ? handleUpdatePlaylist : handleSavePlaylist}> {playlist._id ? "EDIT" : "SAVE" }</button>
      {playlist._id && <button onClick={handleDeletePlaylist}>DELETE</button>}
    </div>
  </>
  )
}