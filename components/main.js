const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;
const Cr = Components.results;

const alert = Components.classes['@mozilla.org/alerts-service;1']
                  .getService(Components.interfaces.nsIAlertsService)
                  .showAlertNotification;

Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");

function Cscreenshot() {};

Cscreenshot.prototype = {
    classDescription: "Citrix Screenshot",
    classID: Components.ID("EC91EC3D-F39C-4E35-8225-862BE24C7D9C"),
    contractID: "@Citrix/screenshot;1",
    QueryInterface: XPCOMUtils.generateQI([Ci.nsIContentPolicy,Ci.nsIObserver,Ci.nsIFactory])
	 /**
   *   observe: function(subject, topic, data) {
   *   switch(topic) {
   *     //case "profile-after-change":
   *      //alert("", "URL Redirect", "received profile-after-change", false, "", null, "");
   *      //break;
   *   }
   *  },
   * lock: function() {},
   * shouldLoad: function(contentType, contentLocation, requestOrigin, node, mimeTypeGuess, extra)
   * {
   *   return Ci.nsIContentPolicy.ACCEPT;
   * }, 
   * shouldProcess: function(contentType, contentLocation, requestOrigin, insecNode, mimeType, extra)
   * {
   *   return Ci.nsIContentPolicy.ACCEPT;
   * }, 
	  */
};


if (XPCOMUtils.generateNSGetFactory)
   var NSGetFactory = XPCOMUtils.generateNSGetFactory([Cscreenshot]);
else
   var NSGetModule = XPCOMUtils.generateNSGetModule([Cscreenshot]);