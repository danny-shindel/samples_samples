import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as playlistAPI from '../../utilities/playlist-api'
import * as wineAPI from '../../utilities/wines-api'
import "./CreatePage.css";

export default function CreatePage({ wine, setWine, setAllWines, playlist, setPlaylist, setEdit }) {
  const history = useHistory();
  const [searchAPI, setSearchAPI] = useState('');
  const [resultsAPI, setResultsAPI] = useState(null);
  const [duplicate, setDuplicate] = useState(false);

  useEffect(function () {
    if (!wine) {
      setWine(JSON.parse(localStorage.getItem('wine')));
    }
  }, [])
  
  function handleChange(evt) {
    setPlaylist({ ...playlist, [evt.target.name]: evt.target.value });
  }

  function handleAPIChange(evt) {
    setSearchAPI(evt.target.value);
  }

  async function handleAPIClick() {
    if (!searchAPI.length) return;
    const results = await playlistAPI.searchAPI({ searchAPI });
    setResultsAPI(results);
  }

  function addToPlaylist(result) {
    const newSongs = [...playlist.songs];
    newSongs.push(result);
    setPlaylist({ ...playlist, songs: newSongs });
    setDuplicate(false);
  }

  function isInPlaylist(result) {
    if (playlist.songs.some(song => song === result)) {
      setDuplicate(result);
    } else {
      addToPlaylist(result);
    }
  }

  function deleteFromPlaylist(idx) {
    const newSongs = [...playlist.songs];
    newSongs.splice(idx, 1);
    setPlaylist({ ...playlist, songs: newSongs });
  }

  async function handleSavePlaylist() {
    const newPlaylist = await playlistAPI.create(playlist);
    const wines = await wineAPI.addPlaylist(wine, newPlaylist);
    setAllWines(wines);
    history.push('/index');
  }

  async function handleUpdatePlaylist() {
    const updatedPlaylist = await playlistAPI.update(playlist);
    const wines = await wineAPI.getAll();
    setEdit(false);
    setAllWines(wines);
    history.push('/index');
  }

  async function handleDeletePlaylist() {
    const deletePlaylist = await playlistAPI.deletePlaylist(playlist._id);
    const wines = await wineAPI.getAll();
    setEdit(false);
    setAllWines(wines);
    history.push('/index');
  }

  return (
    <div className="createPage">
      <div className="columns createPageMainContainer">
        <div className="column createLeftMain">
          <div className="createLeftContainer">
            <p>{wine.title}</p>
            <div className="createLeftWineImage">
              <img className="wine-img" src="https://i.imgur.com/8upb3GM.png"/>
              <div className="createLeftWineDetails">
                <p>Region: {wine.region_1}</p>
                <p>Province: {wine.province}</p>
                <p className="wineDescription">{wine.description}</p>
              </div>
            </div>
            <input placeholder="search" onChange={handleAPIChange} name="searchAPI"></input>
            <button onClick={handleAPIClick}>search song</button>
          </div>
          <div className="results" style={{overflowY: 'scroll', height: 'auto', maxHeight: '40vh' }}>
            <p>Searched Songs</p>
            {resultsAPI && resultsAPI.map((result, idx) =>
              <div>
                <img src={result.album.cover_small} alt="" />
                <div className="resultsInfo">{result.artist.name} - {result.title}</div>
                <button onClick={() => isInPlaylist(result)}>ADD</button>
              </div>
            )}
          </div>
        </div>
        
        {/* ADDED SONGS */}
        <div className="column createRightContainer">
          <div className="createRightTop">
            <p>Create Playlist</p>
            <label>Playlist Title:</label>
            <input placeholder="Samples" name="title" onChange={handleChange} value={playlist.title}></input>
            <label >Playlist Description:</label>
            <textarea placeholder="Details..." onChange={handleChange} name="about" value={playlist.about}></textarea>
            {(playlist.songs.length > 0) && <button onClick={playlist._id ? handleUpdatePlaylist : handleSavePlaylist}> {playlist._id ? "UPDATE PLAYLIST" : "SAVE PLAYLIST"}</button>}
            {playlist._id && <button onClick={handleDeletePlaylist}>DELETE PLAYLIST</button>}
        
          </div>
          <div className="results added-songs-div" style={{ padding: '0', overflowY: 'scroll', height: 'auto', maxHeight: '40vh' }}>
            <p>Songs Added to your Playlist</p>
            {(playlist.songs.length > 0) && playlist.songs.map((song, idx) =>
              <div>
                <img src={song.album.cover_small} alt="" />
                <div className="resultsInfo">{song.artist.name} - {song.title} </div>
                <button onClick={() => deleteFromPlaylist(idx)}>Delete</button>
              </div>
            )}
          </div>
          </div>


      </div>
      {
        duplicate && 
        <div className='alert'>
          <h2>DUPLICATE SONG</h2>
          <button onClick={() => addToPlaylist(duplicate)}>YES</button>
          <button onClick={() => setDuplicate(false)}>NO</button>
        </div>
      }
      
    </div>
  )
}