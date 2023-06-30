import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

function Functionality() {
  //Display 7 day forcast handler
  const [sevenDay, setSevenDay] = React.useState(false);
  //7 Day forcast data
  const [sevenDayData, setSevenDayData] = React.useState({});
  console.log(sevenDayData);
  const [locationLoaded, setLocationLoaded] = React.useState(false);
  //User location state
  const [currLocation, setCurrLocation] = React.useState({});
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
    //
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${item.latitude}&longitude=${item.longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,showers_sum,precipitation_probability_max&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=America%2FNew_York`
    )
      .then((res) => res.json())
      .then((data) => setSevenDayData(data));

    setSevenDay(true);
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
  //Validation need to render 7 day forecast sevenDay && sevenDayData && sevenDayData.daily
  return (
    <div className="App">
      {locationLoaded ? (
        <div>
          <div className="title-location">Your Current Location Is</div>
          <div className="coords">
            <div>{currLocation.coords.latitude}</div>
            <div>{currLocation.coords.longitude}</div>
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
      <div className="overflow-x">
        {sevenDay && sevenDayData && sevenDayData.daily ? (
          <div class="parent">
            <div className="div1"></div>
            <div className="div2"></div>
            <div className="div3"></div>
            <div className="div4"></div>
            <div className="div5"></div>
            <div className="div6"></div>
            <div className="div7"></div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Functionality;
