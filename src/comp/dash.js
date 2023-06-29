import React from "react";

function Functionality() {
  const [locationLoaded, setLocationLoaded] = React.useState(false);
  //User location state
  const [currLocation, setCurrLocation] = React.useState();

  //On success
  const successCallback = (position) => {
    setCurrLocation(position);
    setLocationLoaded(true);
  };
  //On error
  const errorCallback = (error) => {
    console.log(error);
  };
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  //Ask for current location

  return (
    <div className="App">
      {locationLoaded !== false ? (
        <location>
          <div>Your Current Location Is</div>
          <div></div>
        </location>
      ) : (
        <div>Finding your current location...</div>
      )}
    </div>
  );
}

export default Functionality;
