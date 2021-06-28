import { findAllByDisplayValue } from '@testing-library/dom';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser, setMyPlaylistPage }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="navbar" aria-label="main navigation">
      {user ?
        <>
          <div className="navbar-brand">
            <Link className="navbar-item" to="/home" onClick={() => setMyPlaylistPage(false)}>Search</Link> 
            <Link className="navbar-item" to="/index" onClick={() => setMyPlaylistPage(true)}>My Playlists</Link>
            <Link className="navbar-item" to="/index" onClick={() => setMyPlaylistPage(false)}>Saved</Link>
            <p className="navbar-item">Welcome, {user.name}</p>
            <Link className="navbar-item" to="" onClick={handleLogOut}>Log Out</Link>
            <Link role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </Link>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to="/home" onClick={() => setMyPlaylistPage(false)}>Search</Link>
              <Link className="navbar-item" to="/index" onClick={() => setMyPlaylistPage(true)}>My Playlists</Link>
              <Link className="navbar-item" to="/index" onClick={() => setMyPlaylistPage(false)}>Saved</Link>
              <span>Welcome, {user.name}</span>
              <Link className="navbar-item" to="" onClick={handleLogOut}>Log Out</Link>
            </div>
          </div>
        </>
        :
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/home">Search</Link>
            <Link className="navbar-item" to="/auth">Log In</Link>
          </div>
        </div>
      }
    </nav>
  );
}