const {fetchMyIP, fetchCoordsByIP} = require('./iss.js');

fetchCoordsByIP(ip, (error, coords) => {
  if (error) {
    console.log("Unable to get coordinates:", error);
    return;
  }

  console.log("Success! Returned coordinates:", coords);

})


/* Test code - not currently needed
fetchMyIP((error, ip) => {
  if (error) {
    console.log("Request failed:", error);
    return;
  }

  console.log("Success! Returned IP:", ip);
}); */