const {fetchMyIP} = require('./iss.js');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("Request failed:", error);
    return;
  }

  console.log("Success! Returned IP:", ip);
});