import { useEffect, useState } from "react";
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
        }
    
    function handleToggle(wine) {
        if (wine) {
            let wineCopy = { ...wine }
            wineCopy.playlists = wineCopy.playlists.filter(p =>
            (!myPlaylistPage ?
                p.user._id === user._id
                :
                p.saved.some(u => u === user._id)
            ))
            setWine(wineCopy);
            setMyPlaylistPage(!myPlaylistPage);
            if (!myPlaylistPage) setSavedPlaylistPage(true);
        } else {
            setWine(false);
            setMyPlaylistPage(!myPlaylistPage);
            if (!myPlaylistPage) setSavedPlaylistPage(true);
        }
    }

    return (
        <div className="indexPlaylists">
            <div className="indexPlaylistsButtons">
                <button className={`${myPlaylistPage ? 'switchOn switch1' : 'switchOff'}`} onClick={() => handleToggle(userWines[0])}>Created</button>
                <button className={`${myPlaylistPage ? 'switchOff' : 'switchOn switch2'}`} onClick={() => handleToggle(savedWines[0])}>Saved</button>
            </div>
            <div className="indexPlaylistsWines">
                {(myPlaylistPage ? userWines : savedWines).map(w => (
                <div>
                    {console.log(w.title === wine.title)}
                    <button className={`${wine.title === w.title ? 'selected' : ''}`} onClick={() => handleDetails(w)}>{w.title}</button>
                </div>
             ))}
            </div>
        </div>
    )
}