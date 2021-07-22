import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as playlistAPI from '../../utilities/playlist-api';
import "./IndexPage.css";
import IndexPlaylists from '../../components/Index/IndexPlaylists/IndexPlaylists';
import ShowPlaylists from '../../components/Index/ShowPlaylists/ShowPlaylists';

export default function IndexPage({ user, myPlaylistPage, playlists, setPlaylists, allWines, setWine , setSavedPlaylistPage, setMyPlaylistPage}) {
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
    getPlaylists();
  }, [allWines]);

  // function handleDetails(wine) {
  //   let wineCopy = { ...wine }
  //   wineCopy.playlists = wineCopy.playlists.filter(p =>
  //   (myPlaylistPage ?
  //     p.user._id === user._id
  //     :
  //     p.saved.some(u => u === user._id)
  //   ))
  //   setWine(wineCopy);
  //   if (!myPlaylistPage) setSavedPlaylistPage(true);
  //   history.push("/results");
  // }

  return (
    <div className="indexPage">
      <div className="indexPageContainer">
        <div className="indexPlaylists">
          <IndexPlaylists user={user} userWines={userWines} savedWines={savedWines} setWine={setWine} setSavedPlaylistPage={setSavedPlaylistPage} myPlaylistPage={myPlaylistPage} setMyPlaylistPage={setMyPlaylistPage} />
        </div>
        <div className="showPlaylists">
          <ShowPlaylists />
        </div>
      </div>
    </div>
    );
  }







  