import { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import ResultsPage from '../ResultsPage/ResultsPage';
import HomePage from '../HomePage/HomePage';
import IndexPage from '../IndexPage/IndexPage';
import PlaylistPage from '../PlaylistPage/PlaylistPage';
import CreatePage from '../CreatePage/CreatePage';
import NavBar from '../../components/NavBar/NavBar';
import * as winesAPI from "../../utilities/wines-api";

import './App.css';

export default function App() {
  const [allWines, setAllWines] = useState([]);
  const [click, setClick] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [myPlaylistPage, setMyPlaylistPage] = useState(false);
  const [user, setUser] = useState(getUser());
  const [wine, setWine] = useState(null);
  const [wineTitles, setWineTitles] = useState([]);

  useEffect(function() {
    async function getWines() {
      const wines = await winesAPI.getAll();
      setAllWines(wines);
      setWineTitles(wines.map(w => {
        return {title: w.title};
      }));
    }
    getWines();
  }, []);

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} setMyPlaylistPage={setMyPlaylistPage} />
      { user ? 
        <>
          <Switch>
            <Route path="/results">
              <ResultsPage user={user} wine={wine} setWine={setWine} />
            </Route>
            {/* <Route path="/wines/:id">
              <ResultsPage user={user} wine={wine} setWine={setWine} />
            </Route> */}
            <Route path="/home">
              <HomePage setWine={setWine} wineTitles={wineTitles} />
            </Route>
            <Route path="/index">
              <IndexPage 
                user={user}
                myPlaylistPage={myPlaylistPage}
                playlists={playlists}
                setPlaylists={setPlaylists}
                allWines={allWines}
                setWine={setWine}
              />
            </Route>
            <Route path="/create">
              <CreatePage wine={wine} setWine={setWine} setMyPlaylistPage={setMyPlaylistPage} />
            </Route>
            <Route path="/playlist">
              <PlaylistPage />
            </Route>
            <Redirect to={click ? click===1 ? '/results' : '/create' : "/home"} />
          </Switch>
        </>
        :
        <>
          <Switch>
            <Route path="/results">
              <ResultsPage setClick={setClick} wine={wine} />
            </Route>
            <Route path="/home">
              <HomePage setWine={setWine} wineTitles={wineTitles} />
            </Route>
            <Route path="/auth">
              <AuthPage user={user} setUser={setUser} click={click} setClick={setClick} />
            </Route>
            <Redirect to="/home" />
          </Switch>
        </>
      }
    </main>
  );
}
