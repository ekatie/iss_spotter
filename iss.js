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

const fetchCoordsByIP = function(ip, callback) {
  let url = 'http://ipwho.is/' + ip;

  request(url, (error, response, body) => {

    // Check for errors
    if (error) {
      return callback(error, null);
    }

    // Parse returned data
    parsedBody = JSON.parse(body);

    // Check for response errors
    if (!parsedBody.success) {
      return callback(Error(`Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching data for IP ${parsedBody.ip}`, null));
    }

    // Return location coordinates
    let location = parsedBody.slice("latitude", "longitude");
    return callback(null, location);
  });
};

module.exports = {fetchMyIP, fetchCoordsByIP};