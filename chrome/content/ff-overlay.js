screenshot.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ screenshot.showFirefoxContextMenu(e); }, false);
};

screenshot.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-screenshot").hidden = gContextMenu.onImage;
};

var index = 1;

function saveCanvas(canvas, destFile) {
	  // convert string filepath to an nsIFile
	  var file = Components.classes["@mozilla.org/file/local;1"]
						   .createInstance(Components.interfaces.nsILocalFile);
	  file.initWithPath(destFile);

	  // create a data url from the canvas and then create URIs of the source and targets  
	  var io = Components.classes["@mozilla.org/network/io-service;1"]
						 .getService(Components.interfaces.nsIIOService);
	  var source = io.newURI(canvas.toDataURL("image/png", ""), "UTF8", null);
	  var target = io.newFileURI(file)
		
	  // prepare to save the canvas data
	  var persist = Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"]
							  .createInstance(Components.interfaces.nsIWebBrowserPersist);
	  
	  persist.persistFlags = Components.interfaces.nsIWebBrowserPersist.PERSIST_FLAGS_REPLACE_EXISTING_FILES;
	  persist.persistFlags |= Components.interfaces.nsIWebBrowserPersist.PERSIST_FLAGS_AUTODETECT_APPLY_CONVERSION;
	  
	  // displays a download dialog (remove these 3 lines for silent download)
	  //var xfer = Components.classes["@mozilla.org/transfer;1"]
		//				   .createInstance(Components.interfaces.nsITransfer);
	  //xfer.init(source, target, "", null, null, null, persist);
	  //persist.progressListener = xfer;
	  
	  // save the canvas data to the file
	  persist.saveURI(source, null, null, null, null, file);
}

var myExtension = {
    init: function() {
        // The event can be DOMContentLoaded, pageshow, pagehide, load or unload.
        if(gBrowser) gBrowser.addEventListener("DOMContentLoaded", this.onPageLoad, false);
    },
    onPageLoad: function(aEvent) {
		//var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
        var doc = aEvent.originalTarget; // doc is document that triggered the event
        var win = doc.defaultView; // win is the window for the doc
        // test desired conditions and do something
        // if (doc.nodeName == "#document") return; // only documents
        // if (win != win.top) return; //only top window.
        // if (win.frameElement) return; // skip iframes/frames
        //alert("page is loaded \n" +doc.location.href);
	    var consoleService = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
        consoleService.logStringMessage(" ~~~ screenshot ");
		var canvas = document.getElementById('my-canvas');
		var context = canvas.getContext('2d');

		//Find the window dimensions
		canvas.height = doc.defaultView.innerHeight; //doc is the content document that you listened for
		canvas.width = doc.defaultView.innerWidth;

		context.drawWindow(doc.defaultView, 0, 0, canvas.width, canvas.height, "rgba(0,0,0,0)");

		//Create a data url from the canvas
		var dataUrl = canvas.toDataURL("image/png");
		var destFile = "c:\\pngs\\test"+ index + ".png";
		consoleService.logStringMessage(" ~~~ screenshot " + dataUrl);
		//if (aEvent.originalTarget.nodeName == "#document")
		{
			saveCanvas(canvas, destFile);
			index++;
		}
    }
}

window.addEventListener("load", function () { screenshot.onFirefoxLoad(); }, false);
window.addEventListener("load", function() { myExtension.init(); }, false);