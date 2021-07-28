import { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import ResultsPage from '../ResultsPage/ResultsPage';
import HomePage from '../HomePage/HomePage';
import IndexPage from '../IndexPage/IndexPage';
import PlaylistPage from '../PlaylistPage/PlaylistPage';
import CreatePage from '../CreatePage/CreatePage';
import LoadPage from '../LoadPage/LoadPage';
import NavBar from '../../components/NavBar/NavBar';
import * as winesAPI from "../../utilities/wines-api";
import * as usersAPI from "../../utilities/users-api";

import './App.css';

export default function App() {
  const [allWines, setAllWines] = useState([]);
  const [click, setClick] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [myPlaylistPage, setMyPlaylistPage] = useState(false);
  const [user, setUser] = useState(getUser());
  const [userNames, setUserNames] = useState(false);
  const [wine, setWine] = useState(null);
  const [wineTitles, setWineTitles] = useState([]);
  // const [userWines, setUserWines] = useState([]);
  const [playlist, setPlaylist] = useState({
    title: "",
    about: "",
    songs: []
  });
  const [edit, setEdit] = useState(false);
  const [savedPlaylistPage, setSavedPlaylistPage] = useState(false)


  useEffect(function () {
    async function getWines() {
      const wines = await winesAPI.getAll();
      const users = await usersAPI.getAllNames();
      setUserNames(users.map(u => {
        return { title: u.name, _id: u._id }
      }) );
      setAllWines(wines);
      setWineTitles(wines.map(w => {
        return { title: w.title };
      }));
    }
    getWines();
  }, []);

  useEffect(function() {
    if (wine) {
      localStorage.setItem('wine', JSON.stringify(wine));
    }
  }, [wine])

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} setMyPlaylistPage={setMyPlaylistPage} />
      { allWines.length && userNames ? user ?
        <>
          <Switch>
            <Route path="/results">
              <ResultsPage 
                user={user} 
                wine={wine} 
                setWine={setWine} 
                allWines={allWines} 
                setAllWines={setAllWines} 
                myPlaylistPage={myPlaylistPage} 
                setPlaylist={setPlaylist} 
                setEdit={setEdit} 
                savedPlaylistPage={savedPlaylistPage}
              />
            </Route>
            <Route path="/home">
              <HomePage 
                setWine={setWine} 
                wineTitles={wineTitles} 
                setMyPlaylistPage={setMyPlaylistPage} 
                setSavedPlaylistPage={setSavedPlaylistPage}
                userNames={userNames}
              />
            </Route>
            <Route path="/index">
              <IndexPage
                user={user}
                myPlaylistPage={myPlaylistPage}
                setPlaylists={setPlaylists}
                setClick={setClick}
                wine={wine}
                setAllWines={setAllWines}
                setPlaylist={setPlaylist}
                setEdit={setEdit}
                savedPlaylistPage={savedPlaylistPage}
                allWines={allWines}
                setWine={setWine}
                setSavedPlaylistPage={setSavedPlaylistPage}
                setMyPlaylistPage={setMyPlaylistPage}
              />
            </Route>
            <Route path="/create">
              <CreatePage wine={wine} setWine={setWine} setAllWines={setAllWines} playlist={playlist} setPlaylist={setPlaylist} edit={edit} setEdit={setEdit}/>
            </Route>
            <Route path="/playlist">
              <PlaylistPage />
            </Route>
            <Redirect to={click ? click === 1 ? '/results' : '/create' : "/home"} />
          </Switch>
        </>
        :
        <>
          <Switch>
            <Route path="/results">
              <ResultsPage setClick={setClick} wine={wine} setWine={setWine}/>
            </Route>
            <Route path="/home">
              <HomePage setWine={setWine} wineTitles={wineTitles} setMyPlaylistPage={setMyPlaylistPage} setSavedPlaylistPage={setSavedPlaylistPage}/>
            </Route>
            <Route path="/auth">
              <AuthPage user={user} setUser={setUser} click={click} setClick={setClick} />
            </Route>
            <Redirect to="/home" />
          </Switch>
        </>
        : <LoadPage />}
    </main>
  );
}
