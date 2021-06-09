import * as userService from '../../utilities/users-service';
import { Link, useHistory } from "react-router-dom"
import { useState } from 'react';
import * as winesAPI from "../../utilities/wines-api";


export default function HomePage({ setWine }) {
  const [search, setSearch] = useState({ title: '' });
  const history = useHistory();
  
  function handleChange(evt) {
    setSearch({[evt.target.name]: evt.target.value});
  }

  async function handleSubmit() {
    const wine = await winesAPI.search(search);
    setWine(wine);
    history.push('/results');
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