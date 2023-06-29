import React from "react";

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

  //Ask for current location

  return (
    <div className="App">
      {locationLoaded !== false ? (
        <div>
          <div className="title-location">Your Current Location Is</div>
          <div className="coords">
            <div>{currLocation.coords.latitude}</div>
            <div>{currLocation.coords.longitude}</div>
          </div>
        </div>
      ) : (
        <div>Finding your current location...</div>
      )}
    </div>
  );
}

export default Functionality;
