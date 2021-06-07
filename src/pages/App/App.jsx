import { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import ResultsPage from '../ResultsPage/ResultsPage';
import HomePage from '../HomePage/HomePage';
import NavBar from '../../components/NavBar/NavBar';
import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());
  
  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      { user ? 
        <>
          <Switch>
            <Route path="/results">
              <ResultsPage user={user}/>
            </Route>
            <Route path="/home">
              <HomePage />
            </Route>
            <Redirect to="/home" />
          </Switch>
        </>
        :
        <>
          <Switch>
            <Route path="/results">
              <ResultsPage />
            </Route>
            <Route path="/home">
              <HomePage />
            </Route>
            <Redirect to="/home" />
          </Switch>
        </>
      }
    </main>
  );
}
