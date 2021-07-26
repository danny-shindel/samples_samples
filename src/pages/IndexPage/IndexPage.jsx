import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as playlistAPI from '../../utilities/playlist-api';
import "./IndexPage.css";
import IndexPlaylists from '../../components/Index/IndexPlaylists/IndexPlaylists';
import ShowPlaylists from '../../components/Index/ShowPlaylists/ShowPlaylists';

export default function IndexPage({ user, myPlaylistPage, setPlaylists, setClick, wine, setAllWines, setPlaylist, setEdit, savedPlaylistPage, allWines, setWine , setSavedPlaylistPage, setMyPlaylistPage}) {
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
    let initalWine = allWines.find(w => (
      w.playlists.some(p => myPlaylistPage ? p.user._id === user._id : p.saved.some(u => u === user._id))
    ))
    if (initalWine) {
      let theWine = { ...initalWine }
      theWine.playlists = theWine.playlists.filter(p =>
      (myPlaylistPage ?
        p.user._id === user._id
        :
        p.saved.some(u => u === user._id)
      ))
      setWine(theWine);
    }
    getPlaylists();
  }, [allWines]);

  return (
    <div className="indexPage">
      <div className="indexPageContainer">
        <div className="indexPlaylists">
          <IndexPlaylists user={user} userWines={userWines} savedWines={savedWines} wine={wine} setWine={setWine} setSavedPlaylistPage={setSavedPlaylistPage} myPlaylistPage={myPlaylistPage} setMyPlaylistPage={setMyPlaylistPage} />
        </div>
        <div className="showPlaylists">
          <ShowPlaylists user={user} setClick={setClick} wine={wine} setWine={setWine} allWines={allWines} setAllWines={setAllWines} myPlaylistPage={myPlaylistPage} setPlaylist={setPlaylist} setEdit={setEdit} savedPlaylistPage={savedPlaylistPage} userWines={userWines} savedWines={savedWines}/>
        </div>
      </div>
    </div>
    );
  }







  