import { Link } from 'react-router-dom';
import { useState } from 'react';
import * as userService from '../../utilities/users-service';
import './NavBar.css';

export default function NavBar({ user, setUser, setMyPlaylistPage }) {
  const [isActive, setIsActive] = useState(false);

  function handleLogOut() {
    userService.logOut();
    setUser(null);
    setIsActive(false);
  }

  function handleMyPlaylistClick() {
    setMyPlaylistPage(true)
    setIsActive(false)
  }

  function handleSavedClick() {
    setMyPlaylistPage(false)
    setIsActive(false)
  }

  return (
    <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      {user ?
        <>
          <div className="navbar-brand">
            <Link className="search" to="/home" onClick={() => setMyPlaylistPage(false)}>
              <p className="control has-icons-left navbar-item">
                <span className="icon is-large is-left">
                  <i className="fas fa-2x fa-search"></i>
                </span>
              </p>
            </Link>
            <p className="navbar-item">Welcome {user.name} </p>
              <div 
                onClick={() => {
                  setIsActive(!isActive);
                }}
                role="button" 
                className={`navbar-burger burger ${isActive ? 'is-active' : ''}`} 
                aria-label="menu" 
                aria-expanded="false" 
                data-target="navbarBasicExample"
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </div>
          </div>
          <div className={`navbar-menu ${isActive ? 'is-active' : ''}`} id="navbarBasicExample">
            <div className="navbar-end">
              <Link className="navbar-item" to="/index" onClick={handleMyPlaylistClick}>My Playlists</Link>
              <Link className="navbar-item" to="/index" onClick={handleSavedClick}>Saved</Link>
              <Link className="navbar-item" to="" onClick={handleLogOut}>Log Out</Link>
            </div>
          </div>
        </>
        :
        <div className="navbar-brand">
          <Link className="search" to="/home" onClick={() => setMyPlaylistPage(false)}>
            <p className="control has-icons-left navbar-item">
              <span className="icon is-large is-left">
                <i className="fas fa-2x fa-search"></i>
              </span>
            </p>
          </Link>
          <Link onClick={() => setIsActive(false)} className="navbar-item" to="/auth">Log In</Link>
        </div>
      }
    </nav>
  );
}