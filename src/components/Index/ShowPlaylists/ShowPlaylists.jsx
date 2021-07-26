import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as winesAPI from '../../../utilities/wines-api';
// import "./ResultsPage.css";

export default function ShowPlaylists({ user, setClick, wine, setWine, allWines, setAllWines, myPlaylistPage, setPlaylist, setEdit, savedPlaylistPage, userWines, savedWines }) {
  const history = useHistory();

  useEffect(function () {
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
        const wineCopy = { ...updatedWine };
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
    setEdit(false);
  }
  function handleSongLength(seconds) {
    let minutes = Math.floor(seconds / 60);
    let trueSeconds = Math.abs(seconds - (minutes * 60));
    if (trueSeconds < 10) {
      trueSeconds = '0' + trueSeconds;
    }
    return (minutes + ":" + trueSeconds);

  }

  return (
    <div className="resultsPage">
      <div className="resultsPageContainer">
        <div className="leftHand">
          <p className="wineTitle">{wine && wine.title}</p>
          <div className="resultsPageLeftHandImage">
            <img src="https://i.imgur.com/8upb3GM.png" alt="wine bottle"></img>
            <div className="resultsPageImageDetails">
              <p>{wine && wine.variety}</p>
              <p>Region: {wine && wine.region_1}</p>
              <p>Province: {wine && wine.province}</p>
            </div>
          </div>
          <div className="resultsPageWineDetails">
            <p>{wine && wine.description}</p>
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

        </div>
        <div className="rightHand">
          {wine && wine.playlists.map(playlist => (
            <div className="rightHandContainer">
              <div className="playlist-holder">
                <div className="playlist-info">
                  <div className="playlist-info-userImage">
                    <img src={playlist.user.profilePic} className="playlist-profile" />
                  </div>
                  <div className="playlist-info-name">
                    <p className="playlist-title">{playlist.title}</p>
                    <p className="playlist-user">
                      {playlist.user.name} | <span className="playlistDownloads">{playlist.saved.length} downloads</span>
                    </p>
                  </div>
                  <div className="playlist-info-button">
                    {myPlaylistPage ?
                      <button className="button playlist-button" onClick={() => editPlaylist(playlist)}>
                        <span><i class="fas fa-edit icons"></i>Edit</span>
                      </button>
                      :
                      <>
                        {(playlist.user._id !== (user && user._id)) && <button className="button playlist-button" onClick={() => savePlaylist(playlist._id)}>
                          {playlist.saved.find(userId => userId === user._id) ?
                            <span><i class="fas fa-star icons"></i>Unsave</span>
                            :
                            <span><i class="far fa-star icons"></i>{user ? 'Save' : 'Login to Save'}</span>}
                        </button>
                        }
                      </>
                    }
                  </div>
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
                          <span>{handleSongLength(song.duration)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}