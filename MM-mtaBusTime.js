/* global Module */

/* Magic Mirror
 * Module: {{MM-mta-Bustime}}
 *
 * By Fangzhou Yu and Benjamin Huang
 *  MIT Licensed.
 */

Module.register("MM-mtaBusTIme", {
  defaults: {
    module: "MM-mtaBusTime",
    position: "top_bar",
    header: "Bus Arrival Times",
    stops: [
      {
        stopId: 69,
        direction: "uptown", //direction options: uptown or downtown
      },

      {
        stopID: 420,
        direction: "downtownm",
      },
    ],
    updateInterval: 60000,
    retryDelay: 5000,
  },

  requiresVersion: "2.1.0", // Required version of MagicMirror

  start: function () {
    var self = this;
    //Flag for check if module is loaded
    this.loaded = false;

    // Schedule update timer.
    this.getData();
    setInterval(function () {
      self.updateDom();
    }, this.config.updateInterval);
  },

  /*
   * getData
   * function example return data and show it in the module wrapper
   * get a URL request
   *
   */

  getData: function () {
    var config = this.config;
    this.sendSocketNotification("getBusArrivalTimes", config);
  },

  /* scheduleUpdate()
   * Schedule next update.
   *
   * argument delay number - Milliseconds before next update.
   *  If empty, this.config.updateInterval is used.
   */
  scheduleUpdate: function (delay) {
    var nextLoad = this.config.updateInterval;
    if (typeof delay !== "undefined" && delay >= 0) {
      nextLoad = delay;
    }
    nextLoad = nextLoad;
    var self = this;
    setTimeout(function () {
      self.getData();
    }, nextLoad);
  },

  getDom: function () {
    var self = this;
    var busArrivalTable = this.busArrivalTable;
    // create element wrapper for show into the module
    var wrapper = document.createElement("div");
    // If this.dataRequest is not empty
    if (this.dataRequest) {
      var wrapperDataRequest = document.createElement("div");
      // check format https://jsonplaceholder.typicode.com/posts/1
      wrapperDataRequest.innerHTML = this.dataRequest.title;

      var labelDataRequest = document.createElement("label");
      // Use translate function
      //             this id defined in translations files
      labelDataRequest.innerHTML = this.translate("TITLE");

      wrapper.appendChild(labelDataRequest);
      wrapper.appendChild(wrapperDataRequest);
    }

    // Data from helper
    if (this.dataNotification) {
      var wrapperDataNotification = document.createElement("div");
      // translations  + datanotification
      wrapperDataNotification.innerHTML =
        this.translate("UPDATE") + ": " + this.dataNotification.date;

      wrapper.appendChild(wrapperDataNotification);
    }
    return wrapper;
  },

  getStyles: function () {
    return ["MM-mtaBusTime.css"];
  },

  // Load translations files
  getTranslations: function () {
    //FIXME: This can be load a one file javascript definition
    return {
      en: "translations/en.json",
      es: "translations/es.json",
    };
  },

  // socketNotificationReceived from helper
  socketNotificationReceived: function (notification, payload) {
    //receives bus arrival data from node_helper.js
    if (notification === "busArrivalTable") {
      //upon receipt of successful data transmission, set busArrivalTable to the incoming data
      this.busArrivalTable = payload;
      this.updateDom(self.config.fadeSpeed);
    }
  },
});
