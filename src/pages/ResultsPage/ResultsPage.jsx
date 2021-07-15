import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as winesAPI from '../../utilities/wines-api';
import "./ResultsPage.css";

export default function ResultsPage({ user, setClick, wine, setWine, allWines, setAllWines, myPlaylistPage, setPlaylist, setEdit, savedPlaylistPage }) {
  const history = useHistory();

  useEffect(function () {
    if (!wine) {
      setWine(JSON.parse(localStorage.getItem('wine')));
    }
  }, [])

  async function savePlaylist(playlistId) {
    if (user) {
      const updateData = {
        'playlistId': playlistId
      }
      const updatedWine = await winesAPI.addSavedPlaylist(updateData, wine._id);
      const allNewWines = [...allWines];
      const wineIdx = allNewWines.findIndex(w => w._id === wine._id);
      allNewWines.splice(wineIdx, 1, updatedWine);
      setAllWines(allNewWines);
      if (savedPlaylistPage) {
        const wineCopy = { ...updatedWine};
        wineCopy.playlists = wineCopy.playlists.filter(p => p.saved.some(u => u === user._id));
        if (!wineCopy.playlists.length) history.push('/index');
        setWine(wineCopy);
      } else {
        setWine(updatedWine);
      }
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
  function handleSongLength(seconds) {
    let minutes = Math.floor(seconds/60);
    let trueSeconds = Math.abs(seconds - (minutes*60));
    if (trueSeconds < 10) {
      trueSeconds = '0' + trueSeconds;
    }
    return (minutes +":" + trueSeconds);

  }

  return (
    <div className="resultsPage">
      <div className="columns">
        <div className="leftHand column is-5">
          <img src="https://i.imgur.com/8upb3GM.png" alt="wine bottle"></img>
          <p>
            {wine && wine.title}
          </p>
          {user ?
            <>
              <Link to='/create'><button onClick={handleCreateClick}>Create Playlist</button></Link>
            </>
            :
            <>
              <Link to='/auth'><button onClick={() => setClick(2)}>Log In To Create Playlist</button></Link>
            </>
          }
        </div>
        <div className="rightHand column is-7">
          {wine && wine.playlists.map(playlist => (
            <>
              <div className="playlist-holder">
                <div className="playlist-info">
                  <img src={playlist.user.profilePic} className="playlist-profile" />
                  <div className="playlist-title">{playlist.title}</div>
                  <div className="playlist-user">{playlist.user.name} | <span className="playlistDownloads">{playlist.saved.length} downloads</span></div>
                  {myPlaylistPage ?
                    <button className="button playlist-button" onClick={() => editPlaylist(playlist)}>
                      Edit
                    </button>
                    :
                    <>
                    { playlist.user._id !== user._id && <button className="button playlist-button" onClick={() => savePlaylist(playlist._id)}>
                        {playlist.saved.find(userId => userId === user._id) ? 'unsave' : 'save'}
                      </button>}
                    </>
                  }
                </div>
                <div className="playlist-songs">
                  <div className="song-holder">
                    {playlist.songs.map(song => (
                      <div className="playlistHolderSong">
                        <div className="playlistHolderSongInfo">
                          <img src={song.album.cover_small} alt="" />
                          <h3>{song.title} - {song.artist.name}</h3>
                        </div>
                        
                        <div className="playlistHolderSongLength">
                          {console.log(song)}
                          <span>{handleSongLength(song.duration)}</span>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
    
  )
}