const request = require('request');

/**
 * This function makes a single API request to retrieve the user's IP address.
 * @param {function} callback - Function that returns an error or the IP address as a string.
 */

const fetchMyIP = function(callback) {

  request('https://api.ipify.org?format=json', (error, response, body) => {

    // Check for errors
    if (error) {
      return callback(error, null);
    }

    // Check for server error
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }

    // If all good, parse data and return IP address
    let ip = JSON.parse(body).ip;
    return callback(null, ip);
  });
};

/**
 * This function uses an IP address to return the user's location in longitude and latitude.
 * @param {string} ip - User's IP address to use for determining location
 * @param {function} callback - Function that returns an error or the location coordinates.
 */

const fetchCoordsByIP = function(ip, callback) {

  request('http://ipwho.is/' + ip, (error, response, body) => {

    // Check for errors
    if (error) {
      return callback(error, null);
    }

    // Parse returned data
    const parsedBody = JSON.parse(body);

    // Check for response errors
    if (!parsedBody.success) {
      return callback(Error(`Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching data for IP ${parsedBody.ip}`, null));
    }

    // Return location coordinates
    let location = parsedBody.slice("latitude", "longitude");
    return callback(null, location);
  });
};


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const fetchISSFlyOverTimes = function(coords, callback) {

  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    // Check for errors
    if (error) {
      callback(error, null);
      return;
    }

    // Check for server error
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching flyover data. Response: ${body}`), null);
      return;
    }

    // If all good, parse data and return IP address
    let flyoverData = JSON.parse(body).response;
    return callback(null, flyoverData);

  });
};

module.exports = {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes};