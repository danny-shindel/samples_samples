import * as userService from '../../utilities/users-service';
import { Link, useHistory } from "react-router-dom"
import { useState } from 'react';
import * as winesAPI from "../../utilities/wines-api";


export default function HomePage({ setWine, wineTitles }) {
  const [search, setSearch] = useState({ title: '' });
  const history = useHistory();
  
  function handleChange(evt) {
    setSearch({[evt.target.name]: evt.target.value});
  }

  async function handleSubmit() {
    const wine = await winesAPI.search(search);
    // If there is a wine of that name, then go to results page
    if (wine) {
      setWine(wine);
      history.push('/results');
    } else {
      // inform user there is no wine by that name
    }
  }

  return (
    <>
      <h1>HOMEPAGE</h1>
      <input type="text" name="title" onChange={handleChange} value={search.title} required/>
      <button onClick={handleSubmit}> Submit </button>
      <br/>
      <Link to="/results">
        <button>TEST</button>
      </Link>
    </>
  );
}