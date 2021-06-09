import { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import ResultsPage from '../ResultsPage/ResultsPage';
import HomePage from '../HomePage/HomePage';
import IndexPage from '../IndexPage/IndexPage';
import CreatePage from '../CreatePage/CreatePage';
import NavBar from '../../components/NavBar/NavBar';

import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [click, setClick] = useState(null);
  const [wine, setWine] = useState(null);
  
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
              <HomePage setWine={setWine} />
            </Route>
            <Route path="/index">
              <IndexPage />
            </Route>
            <Route path="/create">
              <CreatePage />
            </Route>
            <Redirect to={click ? "/results" : "/home"} />
          </Switch>
        </>
        :
        <>
          <Switch>
            <Route path="/results">
              <ResultsPage setClick={setClick} />
            </Route>
            <Route path="/home">
              <HomePage />
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
