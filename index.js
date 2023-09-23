const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss.js');

/* Test code - not currently needed

fetchMyIP((error, ip) => {
  if (error) {
    console.log("Request failed:", error);
    return;
  }
  console.log("Success! Returned IP:", ip);
});

fetchCoordsByIP(45, (error, coords) => {
  if (error) {
    console.log("Unable to get coordinates:", error);
    return;
  }
  console.log("Success! Returned coordinates:", coords);
})

fetchISSFlyOverTimes({"latitude": 0, "longitude": 2323}, (error, data) => {
  if (error) {
    console.log("Unable to obtain flyover data:", error);
    return;
  }
  console.log("Success! Returned flyover data:", data);
})
*/