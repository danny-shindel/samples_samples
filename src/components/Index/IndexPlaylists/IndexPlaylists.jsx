import { useHistory } from "react-router-dom";

export default function IndexPlaylists({user, userWines, savedWines, myPlaylistPage, setWine , setSavedPlaylistPage, setMyPlaylistPage}) {
    const history = useHistory();

    function handleDetails(wine) {
          let wineCopy = { ...wine }
          wineCopy.playlists = wineCopy.playlists.filter(p =>
          (myPlaylistPage ?
            p.user._id === user._id
            :
            p.saved.some(u => u === user._id)
          ))
          setWine(wineCopy);
          if (!myPlaylistPage) setSavedPlaylistPage(true);
          history.push("/results");
        }

    return (
        <div>
            <button onClick={() => setMyPlaylistPage(true)}>Crearted</button>
            <button onClick={() => setMyPlaylistPage(false)}>Saved</button>
            <br />
            <div>
            {(myPlaylistPage ? userWines : savedWines).map(w => (
            <div>
                <button onClick={() => handleDetails(w)}>{w.title}</button>
                <hr/>
             </div>
             ))}
            </div>
        </div>
    )
}