import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as playlistAPI from '../../utilities/playlist-api';

export default function IndexPage({ user, myPlaylistPage, playlists, setPlaylists, allWines, userWines, setUserWines, setWine }) {
  const [userWines, setUserWines] = useState([])
  const history = useHistory();
  
  useEffect(function(){
    async function getPlaylists(){
      const userPlaylists = await playlistAPI.getUserPlaylists();
      setPlaylists(userPlaylists);
    }
    setUserWines(allWines.filter(w => (
      w.playlists.some(p => p.user == user._id)
    )))
    getPlaylists();
  }, [ allWines ]);

  function handleDetails(wine) {
    setWine(wine);
    history.push("/results");
  }
  
  // const userWines = allWines.filter(w => (
  //   w.playlists.some(p => p.user == user._id)
  // ));
  
  return (
    <>
      <div>{myPlaylistPage ? 'My Playlists' : 'Saved Playlists'}</div>
      <h1>IndexPage</h1>
      <br />
      {myPlaylistPage ? (
        <div>
          {userWines.map(w => (
            <div>
              <h1>Wine Title</h1>
              <h1>{w.title}</h1>
              <br />
              {w.playlists.map(p => (
                <>
                  <h1>playlist Title</h1>
                  <h1>{p.title}</h1>
                  <br />
                </>
              ))}
              <button onClick={() => handleDetails(w)}>Details</button>
               <hr/>
            </div>
          ))}
          {/* {playlists.myPlaylists.map(p => (
            <p>{p.title}</p>
          ))} */}
        </div>
      ) : (
        <div></div>
      )}
      {/* <Link to="/home">
        <button>Create Playlist</button>
      </Link> */}
    </>
  );
}