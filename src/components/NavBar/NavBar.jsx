import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      { user ?
        <>
          <Link to="/home">Search</Link>
          &nbsp; | &nbsp;
          <Link to="/index">My Playlist</Link>
          &nbsp; | &nbsp;
          <Link to="/index">Saved</Link>
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