import { findAllByDisplayValue } from '@testing-library/dom';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser, setMyPlaylistPage }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      {user ?
        <>
          <Link to="/home" onClick={() => setMyPlaylistPage(false)}>Search</Link>
          &nbsp; | &nbsp;
          <Link to="/index" onClick={() => setMyPlaylistPage(true)}>My Playlists</Link>
          &nbsp; | &nbsp;
          <Link to="/index" onClick={() => setMyPlaylistPage(false)}>Saved</Link>
          &nbsp; | &nbsp;
          <span>Welcome, {user.name}</span>
          &nbsp; | &nbsp;
          <Link to="" onClick={handleLogOut}>Log Out</Link>
        </>
        :
        <>
          <Link to="/home">Search</Link>
          &nbsp; | &nbsp;
          <Link to="/auth">Log In</Link>
        </>
      }
    </nav>
  );
}