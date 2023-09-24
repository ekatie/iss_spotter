const {nextISSTimesForMyLocation} = require('./iss.js');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("Unable to obtain flyover data:", error);
  }

  console.log(passTimes);
});