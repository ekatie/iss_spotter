const {nextISSTimesForMyLocation} = require('./iss.js');

const printPassTimes = function(passTimes) {
  for (const time of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("Unable to obtain flyover data:", error);
  }

  printPassTimes(passTimes);
});