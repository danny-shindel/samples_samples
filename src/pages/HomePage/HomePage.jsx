import { useHistory } from "react-router-dom";
import { useState } from 'react';
import * as winesAPI from "../../utilities/wines-api";
import './HomePage.css';


export default function HomePage({ setWine, wineTitles, setMyPlaylistPage, setSavedPlaylistPage }) {
  const [search, setSearch] = useState({ title: '' });
  const [focusDiv, setFocusDiv] = useState({ id: '' });
  const history = useHistory();
  // state for autocomplete feature
  const [display, setDisplay] = useState(false);

  // Prevents scrolling by arrow key
  window.addEventListener('keydown', (evt) => {
    if ([38, 40].indexOf(evt.keyCode) > -1) {
      evt.preventDefault();
    }
  }, false);

  function handleChange(evt) {
    setSearch({ [evt.target.name]: evt.target.value });
    evt.target.value.length ? setDisplay(true) : setDisplay(false);
    setFocusDiv({ id: '' });
  }

  async function handleSubmit() {
    const wine = await winesAPI.search(search);
    // If there is a wine of that name, then go to results page
    if (wine) {
      setWine(wine);
      localStorage.setItem('wine', JSON.stringify(wine));
      setMyPlaylistPage(false);
      setSavedPlaylistPage(false);
      history.push('/results');
    } else {
      // inform user there is no wine by that name
    }
  }

  // Helper Functions
  function setSearchedWine(wine) {
    setSearch(wine);
    setDisplay(false);
    // Return focus to wine search input in order to submit search by keyboard
    document.getElementById('wine-search').focus();
  }

  function handleWineSearch(evt) {
    if (evt.keyCode === 13) handleSubmit();
    if (evt.keyCode === 40) {
      if (!display) return;
      const wineDiv = document.getElementById('div-0');
      if(wineDiv) {
        setFocusDiv(wineDiv);
        wineDiv.focus();
      }
    };
  }

  function handleArrowSelect(evt) {
    if (evt.keyCode === 13) {
      document.getElementById('wine-search').focus();
      setSearch({ 'title': evt.target.innerText });
      setDisplay(false);
    } else {
      if (evt.keyCode !== 40 && evt.keyCode !== 38) return;
      let wineDiv;
      if (evt.keyCode === 40) {
        // Down arrow logic
        wineDiv = document.getElementById(`div-${parseInt(focusDiv.id.match(/\d+$/)) + 1}`);
        if (wineDiv === null) wineDiv = document.getElementById('div-0');
      }
      if (evt.keyCode === 38) {
        // Up arrow logic
        wineDiv = document.getElementById(`div-${parseInt(focusDiv.id.match(/\d+$/)) - 1}`);
        if (wineDiv === null) {
          const mainDivChildren = document.getElementById('dropdown-content-div').children;
          wineDiv = mainDivChildren[mainDivChildren.length - 1].children[0];
        }
      };
      setFocusDiv(wineDiv);
      wineDiv.focus();
    }
  }

  return (
    <div className="homePage">
      <div className="homePageContainer">
        <h1 className="is-size-1">Search a Wine!</h1>
        <div className="dropdown is-active">
          <div className="dropdown-trigger">
            <input
              id="wine-search"
              className="input"
              type="text"
              name="title"
              onChange={handleChange}
              onKeyDown={handleWineSearch}
              onClick={() => setFocusDiv({ id: '' })}
              value={search.title}
              required
              autocomplete="off"
            />
          </div>
          <div id="dropdown-menu-div" className="dropdown-menu">
            {display && (
              <div id="dropdown-content-div" className="dropdown-content" style={{ overflowY: 'scroll' }}>
                {wineTitles
                  .filter(({ title }) => title.toLowerCase().includes(search.title.toLowerCase()))
                  .slice(0, 20)
                  .map((wine, idx) => {
                    return (
                      <div key={idx}>
                        <div
                          id={`div-${idx}`}
                          className={`dropdown-item ${focusDiv.id === `div-${idx}` && "focused-wine"}`}
                          onKeyDown={handleArrowSelect}
                          onClick={() => setSearchedWine(wine)}
                          tabIndex="0"
                        >
                          {wine.title}
                        </div>
                        <hr className="dropdown-divider" />
                      </div>
                    )
                  })
                }
              </div>
            )}
          </div>
        </div>
        <button className="homePageButton button is-link" onClick={handleSubmit}> Submit </button>
      </div>
    </div>
  );
}