const request = require('request-promise-native');

/**
 * This function requests user's ip address from https://www.ipify.org/
 * @returns - Promise of request for ip data, returned as JSON string
 */

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

/**
 * This function makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude).
 * @param {JSON string} body - Contains the IP address
 * @returns - Promise of request for latitude/longitude
 */

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};

/**
 * This function requests data from https://iss-flyover.herokuapp.com using provided latitude/longitude data.
 * @param {JSON string} body - Contains geographical data response from ipwho.is
 * @returns - Promise of request for fly over data, returned as JSON string
 */
const fetchISSFlyOverTimes = function(body) {
  const {latitude, longitude} = JSON.parse(body);
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

/**
 * This functions handles the promises returned by the API calls in the previous functions.
 * @returns - Promise for fly over data for users location
 */

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const {response} = JSON.parse(data);
      return response;
    });
};

module.exports = {nextISSTimesForMyLocation};