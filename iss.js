const request = require('request');
const url = 'https://api.ipify.org?format=json';

/**
 * This function makes a single API request to retrieve the user's IP address.
 * @param {function} callback - Function that returns an error or the IP address as a string.
 */

const fetchMyIP = function(callback) {

  request(url, (error, response, body) => {

    // Check for errors
    if (error) {
      return callback(error, null);
    }

    // Check for server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // If all good, return IP address
    let data = JSON.parse(body);
    let IP = data.ip;

    return callback(null, IP);
  });
};

module.exports = {fetchMyIP};