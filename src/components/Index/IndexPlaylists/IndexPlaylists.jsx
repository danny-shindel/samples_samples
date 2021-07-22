import { useHistory } from "react-router-dom";
import "./IndexPlaylists.css";

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
        <div className="indexPlaylists">
            <div className="indexPlaylistsButtons">
                <button className={`${myPlaylistPage ? 'switchOn' : 'switchOff'}`} onClick={() => setMyPlaylistPage(true)}>Created</button>
                <button className={`${myPlaylistPage ? 'switchOff' : 'switchOn'}`} onClick={() => setMyPlaylistPage(false)}>Saved</button>
            </div>
            <div className="indexPlaylistsWines">
                {(myPlaylistPage ? userWines : savedWines).map(w => (
                <div>
                    <button onClick={() => handleDetails(w)}>{w.title}</button>
                </div>
             ))}
            </div>
        </div>
    )
}