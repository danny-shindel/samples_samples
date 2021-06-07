import * as userService from '../../utilities/users-service';
import { Link } from "react-router-dom"

export default function HomePage() {

  return (
    <>
      <h1>HOMEPAGE</h1>
      <Link to="/results">
        <button>TEST</button>
      </Link>
    </>
  );
}