/* Magic Mirror
 * Node Helper: MM-mtaBusTime
 *
 * By Fangzhou Yu and Benjamin Huang
 * {{LICENSE}} Licensed.
 */

var NodeHelper = require("node_helper");

const axios = require("axios").default; // library to help with GET requests

module.exports = NodeHelper.create({
  // Override socketNotificationReceived method.

  /* socketNotificationReceived(notification, payload)
   * This method is called when a socket notification arrives.
   *
   * argument notification string - The identifier of the noitication.
   * argument payload mixed - The payload of the notification.
   */
  socketNotificationReceived: function (notification, payload) {
    if (notification === "{{MODULE_NAME}}-NOTIFICATION_TEST") {
      console.log(
        "Working notification system. Notification:",
        notification,
        "payload: ",
        payload
      );
      // Send notification
      this.sendNotificationTest(this.anotherFunction()); //Is possible send objects :)
    }
  },

  // Example function send notification test
  sendNotificationTest: function (payload) {
    this.sendSocketNotification("{{MODULE_NAME}}-NOTIFICATION_TEST", payload);
  },

  // this you can create extra routes for your module
  extraRoutes: function () {
    var self = this;
    this.expressApp.get("/{{MODULE_NAME}}/extra_route", function (req, res) {
      // call another function
      values = self.anotherFunction();
      res.send(values);
    });
  },

  // Test another function
  anotherFunction: function () {
    return { date: new Date() };
  },
});
