import { Link } from 'react-router-dom';

export default function IndexPage({ user }) {
  return (
    <>
      <h1>IndexPage</h1>
      <Link to="/playlist">
        <button>Create Playlist</button>
      </Link>
    </>
  );
}