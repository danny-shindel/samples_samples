import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./IndexPlaylists.css";

export default function IndexPlaylists({user, userWines, savedWines, myPlaylistPage, wine, setWine , setSavedPlaylistPage, setMyPlaylistPage}) {
    
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
        //   history.push("/results");
        }

    function handleCreated(wine) {
        let wineCopy = { ...wine }
        wineCopy.playlists = wineCopy.playlists.filter(p =>
        (myPlaylistPage ?
            p.user._id === user._id
            :
            p.saved.some(u => u === user._id)
        ))
        setWine(wineCopy);
        setMyPlaylistPage(true);
        if (!myPlaylistPage) setSavedPlaylistPage(true);
        //   history.push("/results");
    }
    
    function handleSaved(wine) {
        if (wine) {
            let wineCopy = { ...wine }
            wineCopy.playlists = wineCopy.playlists.filter(p =>
            (myPlaylistPage ?
                p.user._id === user._id
                :
                p.saved.some(u => u === user._id)
            ))
            setWine(wineCopy);
            setMyPlaylistPage(false);
            if (!myPlaylistPage) setSavedPlaylistPage(true);
            //   history.push("/results");
        } else {
            setMyPlaylistPage(false);
            if (!myPlaylistPage) setSavedPlaylistPage(true);
        }
    }
    // function handleCreatedClick(){
    //     handleDetails(userWines[0]);
    //     setMyPlaylistPage(true);
    //     console.log();
    // }



    return (
        <div className="indexPlaylists">
            <div className="indexPlaylistsButtons">
                <button className={`${myPlaylistPage ? 'switchOn' : 'switchOff'}`} onClick={() => handleCreated(userWines[0])}>Created</button>
                <button className={`${myPlaylistPage ? 'switchOff' : 'switchOn'}`} onClick={() => handleSaved(savedWines[0])}>Saved</button>
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