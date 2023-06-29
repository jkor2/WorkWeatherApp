import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

function Functionality() {
  const [locationLoaded, setLocationLoaded] = React.useState(false);
  //User location state
  const [currLocation, setCurrLocation] = React.useState({});
  console.log(currLocation);
  React.useEffect(() => {
    const successCallback = (position) => {
      setCurrLocation(position);
      setLocationLoaded(true);
    };

    const errorCallback = (error) => {
      console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  //Search bar section ############################
  const [items, setSearchItem] = React.useState({});
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${string}&count=10&language=en&format=json`
    )
      .then((res) => res.json())
      .then((data) => setSearchItem(data));
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log("three");
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log("tp");
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        <div className="search-bar-response">
          <span style={{ display: "block", textAlign: "left" }}>
            {item.name} -
          </span>
          <span style={{ display: "block", textAlign: "left" }}>
            {item.admin1}
          </span>
        </div>
      </>
    );
  };

  const style = {
    height: "8vw",
  };

  //###############################################
  return (
    <div className="App">
      {locationLoaded ? (
        <div>
          <div className="title-location">Your Current Location Is</div>
          <div className="coords">
            <div>{currLocation.coords.latitude}</div>
            <div>{currLocation.coords.longitude}</div>
          </div>
          <div className="search">
            <ReactSearchAutocomplete
              items={items.results}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              autoFocus
              formatResult={formatResult}
              styling={style}
            />
          </div>
        </div>
      ) : (
        <div>Current Location Unknown</div>
      )}
      <div className="search">
        <ReactSearchAutocomplete
          items={items.results}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          autoFocus
          formatResult={formatResult}
          styling={style}
        />
      </div>
    </div>
  );
}

export default Functionality;
