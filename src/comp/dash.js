import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

function Functionality() {
  const [locationLoaded, setLocationLoaded] = React.useState(false);
  //User location state
  const [currLocation, setCurrLocation] = React.useState();
  React.useEffect(() => {
    const successCallback = (position) => {
      setCurrLocation(position);
      console.log(position);
      setLocationLoaded(true);
    };

    const errorCallback = (error) => {
      console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  //Search bar section ############################
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>id: "Test"</span>
        <span style={{ display: "block", textAlign: "left" }}>
          name: Test 2
        </span>
      </>
    );
  };

  const style = {
    height: "8vw",
  };

  //###############################################
  return (
    <div className="App">
      {locationLoaded !== false ? (
        <div>
          <div className="title-location">Your Current Location Is</div>
          <div className="coords">
            <div>{currLocation.coords.latitude}</div>
            <div>{currLocation.coords.longitude}</div>
          </div>
          <div className="search">
            <ReactSearchAutocomplete
              items
              onSearch={handleOnSearch}
              onSelect={handleOnSelect}
              formatResult={formatResult}
              styling={style}
            />
          </div>
        </div>
      ) : (
        <div>Finding your current location...</div>
      )}
    </div>
  );
}

export default Functionality;
