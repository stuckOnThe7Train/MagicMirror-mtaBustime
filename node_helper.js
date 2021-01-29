/* Magic Mirror
 * Node Helper: MM-mtaBusTime
 *
 * By Fangzhou Yu and Benjamin Huang
 * {{LICENSE}} Licensed.
 */

var NodeHelper = require("node_helper");

const axios = require("axios").default; // library to help with GET requests

module.exports = NodeHelper.create({
  // Test another function
  start: function () {
    console.log("hello world");
  },

  getArrivalData: function (config) {
    var apiKey = config.apiKey;
    var stopID = config.stop;
    var direction = config.direction;
    var busRoute = config.busRoute;
    var busTimeURL = "http://bustime.mta.info/api/siri/stop-monitoring.json";

    var apiParams = {
      key: apiKey,
      version: 2,
      OperatorRef: "MTA",
      MonitoringRef: stopID,
      LineRef: busRoute,
      DirectionRef: direction,
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
