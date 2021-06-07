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
          <Link to="/home">Order History</Link>
        & nbsp; | &nbsp;
          <Link to="/orders/new">New Order</Link>
      &nbsp; | &nbsp;
          <span>Welcome, {user.name}</span>
      &nbsp; | &nbsp;
          <Link to="" onClick={handleLogOut}>Log Out</Link>
        </>
        :
        <>
          <span>Welcome,</span>
        </>
      }
    </nav>
  );
}