// Carga un CSS diferente dependiendo de la Versión del Navegador.
var BrowserDetect = { 
    init: function () { 
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser"; 
        this.version = this.searchVersion(navigator.userAgent) 
            || this.searchVersion(navigator.appVersion) 
            || "an unknown version"; 
        this.OS = this.searchString(this.dataOS) || "an unknown OS"; 
    }, 
    searchString: function (data) { 
        for (var i=0;i<data.length;i++)  { 
            var dataString = data[i].string; 
            var dataProp = data[i].prop; 
            this.versionSearchString = data[i].versionSearch || data[i].identity; 
            if (dataString) { 
                if (dataString.indexOf(data[i].subString) != -1) 
                    return data[i].identity; 
            } 
            else if (dataProp) 
                return data[i].identity; 
        } 
    }, 
    searchVersion: function (dataString) { 
        var index = dataString.indexOf(this.versionSearchString); 
        if (index == -1) return; 
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1)); 
    }, 
    dataBrowser: [ 
        { 
            string: navigator.userAgent, 
            subString: "Chrome", 
            identity: "Chrome" 
        }, 
        { 
            string: navigator.vendor, 
            subString: "Apple", 
            identity: "Safari" 
        }, 
        { 
            prop: window.opera, 
            identity: "Opera" 
        }, 
        { 
            string: navigator.userAgent, 
            subString: "Firefox", 
            identity: "Firefox" 
        }, 
        {       // for newer Netscapes (6+) 
            string: navigator.userAgent, 
            subString: "Netscape", 
            identity: "Netscape" 
        }, 
        { 
            string: navigator.userAgent, 
            subString: "MSIE", 
            identity: "Explorer", 
            versionSearch: "MSIE" 
        }, 
        { 
            string: navigator.userAgent, 
            subString: "Gecko", 
            identity: "Mozilla", 
            versionSearch: "rv" 
        }, 
        {       // for older Netscapes (4-) 
            string: navigator.userAgent, 
            subString: "Mozilla", 
            identity: "Netscape", 
            versionSearch: "Mozilla" 
        } 
    ], 
    dataOS : [ 
        { 
            string: navigator.platform, 
            subString: "Win", 
            identity: "Windows" 
        }, 
        { 
            string: navigator.platform, 
            subString: "Mac", 
            identity: "Mac" 
        }, 
        { 
            string: navigator.platform, 
            subString: "Linux", 
            identity: "Linux" 
        } 
    ] 
}

BrowserDetect.init(); 
if (BrowserDetect.browser == "Firefox") {
	if (BrowserDetect.version == "3"){
		document.write("<link rel='stylesheet' type='text/css' href='../../../5- Hacking/JavaScript Browser Hacking/js/css/*_firefox3.css' />");
	}
	if (BrowserDetect.version == "2"){
		document.write("<link rel='stylesheet' type='text/css' href='../../../5- Hacking/JavaScript Browser Hacking/js/css/*_firefox2.css' />");
	}
}
if (BrowserDetect.browser == "Explorer") {
	if (BrowserDetect.version == "8"){
		document.write("<link rel='stylesheet' type='text/css' href='../../../5- Hacking/JavaScript Browser Hacking/js/css/*_explorer8.css' />");
	}
	if (BrowserDetect.version == "7"){
		document.write("<link rel='stylesheet' type='text/css' href='../../../5- Hacking/JavaScript Browser Hacking/js/css/*_explorer7.css' />");
	}
		if (BrowserDetect.version == "6"){
		document.write("<link rel='stylesheet' type='text/css' href='../../../5- Hacking/JavaScript Browser Hacking/js/css/*_explorer6.css' />");
	}
}
if (BrowserDetect.browser == "Safari") {
	document.write("<link rel='stylesheet' type='text/css' href='../../../5- Hacking/JavaScript Browser Hacking/js/css/*_safari.css' />");
}
if (BrowserDetect.browser == "Opera") {
	document.write("<link rel='stylesheet' type='text/css' href='../../../5- Hacking/JavaScript Browser Hacking/js/css/*_opera.css' />");
}
if (BrowserDetect.browser == "Chrome") {
	if (BrowserDetect.version == "1"){
		document.write("<link rel='stylesheet' type='text/css' href='../../../5- Hacking/JavaScript Browser Hacking/js/css/*_chrome.css' />");
	}
}