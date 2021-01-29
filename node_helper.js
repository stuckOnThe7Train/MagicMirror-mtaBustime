/* Magic Mirror
 * Node Helper: MM-mtaBusTime
 *
 * By Fangzhou Yu and Benjamin Huang
 * {{LICENSE}} Licensed.
 */

var NodeHelper = require("node_helper");

const axios = require("axios").default; // library to help with GET requests

var directionDict = []; // Use a dict to map uptown to 0 and downtown to 1
directionDict.push({
  key: "uptown",
  value: 0,
});

directionDict.push({
  key: "downtown",
  value: 1,
});

module.exports = NodeHelper.create({
  // Test another function
  start: function () {
    console.log("hello world");
  },

  getArrivalData: function (config) {
    const apiKey = config.apiKey;
    const stopID = config.stopID;
    const direction = config.direction;
    const busRoute = config.busRoute;
    const busTimeURL = "http://bustime.mta.info/api/siri/stop-monitoring.json";

    const apiParams = {
      key: apiKey,
      version: 2,
      OperatorRef: "MTA",
      MonitoringRef: stopID,
      LineRef: busRoute,
      DirectionRef: directionDict[direction],
    };

    function handleSuccess(data) {
      console.log(data);
    }
    function handleFailure(data) {
      console.log("error", data);
    }
    axios
      .get(busTimeURL, {
        params: apiParams,
      })
      .then(handleSuccess)
      .catch(handleFailure);
  },
});
