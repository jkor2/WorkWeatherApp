import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
function Functionality() {
  const [hourly, setHourlyChart] = React.useState({});

  //register chart
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Hour x Hour Rain - 72 Hrs",
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: "5vw",
          },
          color: "black", // Change the color of the x-axis tick text
        },
        grid: {
          color: "white", // Change the color of the x-axis grid lines
        },
      },
      y: {
        grid: {
          color: "white", // Change the color of the y-axis grid lines
        },
      },
    },
  };

  const labels = hourly.hourly
    ? hourly.hourly.time.map(convertDateTime)
    : ["null"];

  function convertDateTime(dateTimeString) {
    const dateObject = new Date(dateTimeString);
    const dayOfWeek = getDayOfWeek(dateObject);
    const hourOfDay = dateObject.getHours();
    const formattedHour = hourOfDay % 12 || 12; // Convert to 12-hour format

    const period = hourOfDay < 12 ? "AM" : "PM";

    return `${dayOfWeek} ${formattedHour}:00 ${period}`;
  }

  function getDayOfWeek(date) {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekdays[date.getDay()];
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Rain",
        data: hourly.hourly ? hourly.hourly.precipitation : ["null"],
        backgroundColor: "black",
        borderWidth: 1,
        barThickness: 8,
      },
    ],
  };

  //#############################################
  //screen width
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  //3 Day hourly Breakdown
  console.log(hourly);
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
      `https://geocoding-api.open-meteo.com/v1/search?name=${string}&count=4&language=en&format=json`
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
    //fetch(
    //  `https://api.open-meteo.com/v1/forecast?latitude=${item.latitude}&longitude=${item.longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,showers_sum,precipitation_probability_max&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=America%2FNew_York`
    //)
    //      .then((res) => res.json())
    //    .then((data) => setSevenDayData(data));

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${item.latitude}&longitude=${item.longitude}&models=best_match&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,showers_sum,precipitation_probability_max&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=America%2FNew_York`
    )
      .then((res) => res.json())
      .then((data) => setSevenDayData(data));

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${item.latitude}&longitude=${item.longitude}&hourly=precipitation_probability,precipitation&models=best_match&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=America%2FNew_York`
    )
      .then((res) => res.json())
      .then((data) => setHourlyChart(data));

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

  //convert date function
  function convertDate(date) {
    var dateParts = date.split("-"); // Split the string into year, month, and day
    var year = parseInt(dateParts[0]);
    var month = parseInt(dateParts[1]) - 1; // Months are zero-based (0-11)
    var day = parseInt(dateParts[2]);

    var date = new Date(year, month, day);

    var weekday = date.toLocaleDateString("en-US", { weekday: "long" });

    return weekday;
  }

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
            <div className="div1">
              <div class="parent-two">
                <div class="div1-two">
                  <div>MIN_TEMP</div>
                  <div className="bigger">
                    {sevenDayData.daily.temperature_2m_min[0]}
                  </div>
                </div>
                <div class="div2-two">
                  <div>MAX_TEMP</div>
                  <div className="bigger">
                    {" "}
                    {sevenDayData.daily.temperature_2m_max[0]}
                  </div>{" "}
                </div>
                <div class="div3-two">
                  <div>PRCP_PROB</div>
                  <div className="bigger">
                    {" "}
                    {sevenDayData.daily.precipitation_probability_max[0]}%
                  </div>
                </div>
                <div class="div4-two">
                  <div>MAX_RAIN</div>
                  <div className="bigger">
                    {sevenDayData.daily.precipitation_sum[0]}"
                  </div>
                </div>
                <div class="div5-two bigger">
                  {" "}
                  {convertDate(sevenDayData.daily.time[0])}{" "}
                </div>
              </div>
            </div>
            <div className="div2">
              <div class="parent-two">
                <div class="div1-two">
                  <div>MIN_TEMP</div>
                  <div className="bigger">
                    {sevenDayData.daily.temperature_2m_min[1]}
                  </div>
                </div>
                <div class="div2-two">
                  <div>MAX_TEMP</div>
                  <div className="bigger">
                    {" "}
                    {sevenDayData.daily.temperature_2m_max[1]}
                  </div>{" "}
                </div>
                <div class="div3-two">
                  <div>PRCP_PROB</div>
                  <div className="bigger">
                    {" "}
                    {sevenDayData.daily.precipitation_probability_max[1]}%
                  </div>
                </div>
                <div class="div4-two">
                  <div>MAX_RAIN</div>
                  <div className="bigger">
                    {sevenDayData.daily.precipitation_sum[1]}"
                  </div>
                </div>
                <div class="div5-two bigger">
                  {" "}
                  {convertDate(sevenDayData.daily.time[1])}{" "}
                </div>
              </div>
            </div>
            <div className="div3">
              <div class="parent-two">
                <div class="div1-two">
                  <div>MIN_TEMP</div>
                  <div className="bigger">
                    {sevenDayData.daily.temperature_2m_min[2]}
                  </div>
                </div>
                <div class="div2-two">
                  <div>MAX_TEMP</div>
                  <div className="bigger">
                    {" "}
                    {sevenDayData.daily.temperature_2m_max[2]}
                  </div>{" "}
                </div>
                <div class="div3-two">
                  <div>PRCP_PROB</div>
                  <div className="bigger">
                    {" "}
                    {sevenDayData.daily.precipitation_probability_max[2]}%
                  </div>
                </div>
                <div class="div4-two">
                  <div>MAX_RAIN</div>
                  <div className="bigger">
                    {sevenDayData.daily.precipitation_sum[2]}"
                  </div>
                </div>
                <div class="div5-two bigger">
                  {" "}
                  {convertDate(sevenDayData.daily.time[2])}{" "}
                </div>
              </div>
            </div>
            <div className="div4">
              <div class="parent-two">
                <div class="div1-two">
                  <div>MIN_TEMP</div>
                  <div className="bigger">
                    {sevenDayData.daily.temperature_2m_min[3]}
                  </div>
                </div>
                <div class="div2-two">
                  <div>MAX_TEMP</div>
                  <div className="bigger">
                    {" "}
                    {sevenDayData.daily.temperature_2m_max[3]}
                  </div>{" "}
                </div>
                <div class="div3-two">
                  <div>PRCP_PROB</div>
                  <div className="bigger">
                    {" "}
                    {sevenDayData.daily.precipitation_probability_max[3]}%
                  </div>
                </div>
                <div class="div4-two">
                  <div>MAX_RAIN</div>
                  <div className="bigger">
                    {sevenDayData.daily.precipitation_sum[3]}"
                  </div>
                </div>
                <div class="div5-two bigger">
                  {" "}
                  {convertDate(sevenDayData.daily.time[3])}{" "}
                </div>
              </div>
            </div>
            <div className="div5">
              <div class="parent-two">
                <div class="div1-two">
                  <div>MIN_TEMP</div>
                  <div className="bigger">
                    {sevenDayData.daily.temperature_2m_min[4]}
                  </div>
                </div>
                <div class="div2-two">
                  <div>MAX_TEMP</div>
                  <div className="bigger">
                    {" "}
                    {sevenDayData.daily.temperature_2m_max[4]}
                  </div>{" "}
                </div>
                <div class="div3-two">
                  <div>PRCP_PROB</div>
                  <div className="bigger">
                    {" "}
                    {sevenDayData.daily.precipitation_probability_max[4]}%
                  </div>
                </div>
                <div class="div4-two">
                  <div>MAX_RAIN</div>
                  <div className="bigger">
                    {sevenDayData.daily.precipitation_sum[4]}"
                  </div>
                </div>
                <div class="div5-two bigger">
                  {" "}
                  {convertDate(sevenDayData.daily.time[4])}{" "}
                </div>
              </div>
            </div>
            <div className="div6">
              <div class="parent-two">
                <div class="div1-two">
                  <div>MIN_TEMP</div>
                  <div className="bigger">
                    {sevenDayData.daily.temperature_2m_min[5]}
                  </div>
                </div>
                <div class="div2-two">
                  <div>MAX_TEMP</div>
                  <div className="bigger">
                    {" "}
                    {sevenDayData.daily.temperature_2m_max[5]}
                  </div>{" "}
                </div>
                <div class="div3-two">
                  <div>PRCP_PROB</div>
                  <div className="bigger">
                    {" "}
                    {sevenDayData.daily.precipitation_probability_max[5]}%
                  </div>
                </div>
                <div class="div4-two">
                  <div>MAX_RAIN</div>
                  <div className="bigger">
                    {sevenDayData.daily.precipitation_sum[5]}"
                  </div>
                </div>
                <div class="div5-two bigger">
                  {" "}
                  {convertDate(sevenDayData.daily.time[5])}{" "}
                </div>
              </div>
            </div>
            <div className="div7">
              <div class="parent-two">
                <div class="div1-two">
                  <div>MIN_TEMP</div>
                  <div className="bigger">
                    {sevenDayData.daily.temperature_2m_min[6]}
                  </div>
                </div>
                <div class="div2-two">
                  <div>MAX_TEMP</div>
                  <div className="bigger">
                    {" "}
                    {sevenDayData.daily.temperature_2m_max[6]}
                  </div>{" "}
                </div>
                <div class="div3-two">
                  <div>PRCP_PROB</div>
                  <div className="bigger">
                    {" "}
                    {sevenDayData.daily.precipitation_probability_max[6]}%
                  </div>
                </div>
                <div class="div4-two">
                  <div>MAX_RAIN</div>
                  <div className="bigger">
                    {sevenDayData.daily.precipitation_sum[6]}"
                  </div>
                </div>
                <div class="div5-two bigger">
                  {" "}
                  {convertDate(sevenDayData.daily.time[6])}{" "}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {sevenDay && sevenDayData && sevenDayData.daily ? (
        <div className="chart-hold">
          <Bar options={options} data={data} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Functionality;
