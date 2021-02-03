/* Magic Mirror
 * Node Helper: MM-mtaBusTime
 *
 * By Fangzhou Yu and Benjamin Huang
 * MIT Licensed.
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
    const stopID = config.stops.map((obj) => obj.stopID);
    const direction = config.stops.map((obj) => obj.direction);
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
      //process the incoming API data in the method and feed it to the core module file

      var busHashMap = [];
      var stopName = data.stopName;

      //loop through all the buses that came in the api response
      // then another loop to find all the arrival times
      // push data into bushHashMap
      // send socket notifications in a for loop traversing though all stops....each stop has its own hashmap
      self.sendSocketNotification("stopName", stopName);
      self.sendSocketNotification("busArrivalTable", busHashMap);
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

  socketNotificationReceived: function (notification, config) {
    if (notification === "getBusArrivalTimes") {
      this.getArrivalData(config);
    }
  },
});
