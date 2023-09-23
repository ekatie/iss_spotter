const request = require('request');
const url = 'https://api.ipify.org?format=json';

/**
 * This function makes a single API request to retrieve the user's IP address.
 * @param {function} callback - Function that returns an error or the IP address as a string.
 */

const fetchMyIP = function(callback) {
  request(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    let data = JSON.parse(body);
    let IP = data.ip;

    return callback(null, IP);
  });
};

module.exports = {fetchMyIP};