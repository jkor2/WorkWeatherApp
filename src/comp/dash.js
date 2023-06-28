function Functionality() {
  //On success
  const successCallback = (position) => {
    console.log(position);
  };
  //On error
  const errorCallback = (error) => {
    console.log(error);
  };

  //Ask for current location
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  return (
    <div className="App">
      <h1>Connection Tested</h1>
    </div>
  );
}

export default Functionality;
