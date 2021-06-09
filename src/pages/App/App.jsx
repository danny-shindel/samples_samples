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
  const [wine, setWine] = useState(null);
  const [click, setClick] = useState(null);
  const [user, setUser] = useState(getUser());
  const [wineTitles, setWineTitles] = useState([]);

  useEffect(function() {
    async function getWines() {
      const wines = await winesAPI.getAll();
      setWineTitles(wines);
    }
    getWines();
  }, []);

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      { user ? 
        <>
          <Switch>
            <Route path="/results">
              <ResultsPage user={user} wine={wine}/>
            </Route>
            <Route path="/home">
              <HomePage setWine={setWine} wineTitles={wineTitles} />
            </Route>
            <Route path="/index">
              <IndexPage />
            </Route>
            <Route path="/create">
              <CreatePage />
            </Route>
            <Route path="/playlist">
              <PlaylistPage />
            </Route>
            <Redirect to={click ? "/results" : "/home"} />
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
