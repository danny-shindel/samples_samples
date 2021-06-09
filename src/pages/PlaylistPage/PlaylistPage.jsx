import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PlaylistPage({ user }) {
  const [playlist, setPlaylist] = useState({
    title:"",
    songs: []
  })

  function handleChange(evt){
    setPlaylist({[evt.target.name]: evt.target.value})
  }

  function handleCreate(){
    
  }

  return (
    <>
      <h1>PlaylistPage</h1>
      <input name="title" onChange={handleChange}></input>
      <input></input>
      <button onClick={handleCreate}>Create Playlist</button>
    </>
  );
}