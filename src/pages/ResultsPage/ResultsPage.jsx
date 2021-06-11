import { Link } from 'react-router-dom';

export default function ResultsPage({ user, setClick, wine }) {

  function handleClick() { 

  }

  return(
  <div>
    <div>{wine && wine.title}</div>
    <h1>ResultsPage</h1>
    { user ?
    <>
      <button>Save</button>
      <button>CreatePlaylist</button>
    </>
    :
    <>
      <Link to='/auth'><button onClick={() => setClick(1)}>Save (login)</button></Link>
      <Link to='/auth'><button onClick={() => setClick(2)}>Create Play (login)</button></Link>
    </>
    }
  </div>
  ) 
}