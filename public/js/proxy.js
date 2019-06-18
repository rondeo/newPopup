//  * This file implements the ProxyController class, which
//  * contains with logic that enables implementation of proxy
//  * Settings.

function ProxyModule() {
    this.proxyId = 0;
    this.isActive = false;
    this.inProgress = false;
    this.targetUrl = '';
    this.serversSource = [];
}

// Set  quotationsUrl
ProxyModule.prototype.setTargetUrl = function (url) {

    if (!url) {
        return;
    }
    this.targetUrl = url;
};


// this get current Chrome proxy Settings (for development)

ProxyModule.prototype.getProxyServer = function () {

    chrome.proxy.settings.get({'incognito': false}, function (config) {
        console.log(JSON.stringify(config));
        return JSON.stringify(config);
    });
};

// Set Chrome proxy Settings to default mode  - Use system proxy Settings

ProxyModule.prototype.setDefaultProxySettings = function () {
    var config = {"mode": "system"};

    chrome.proxy.settings.set({value: config, scope: 'regular'}, function () {
        chrome.storage.local.set({proxyUrl: "System Proxy"}, function () {
            console.log('Value is set to system');
        });
    });
};


// check access to URL (for development)

ProxyModule.prototype.checkConnection = function (url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.timeout = 3000;
        xhr.setRequestHeader('Content-Type', 'text/html');
        xhr.onreadystatechange = function () {

            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject(xhr.responseText);
            }
        };
        xhr.ontimeout = function (error) {
            console.log("time Err" + error);
            reject(error.message);
        };
        xhr.send();
    });
};


ProxyModule.prototype.setProxyServer = function (poxyServer) {
    var newProxyServer = poxyServer.url + ":" + poxyServer.port;
    var pacScriptData = ProxyModule.prototype.pacScriptGenerator.call(this, poxyServer);
    var configPac = {
        mode: "pac_script",
        pacScript: {
            data: pacScriptData
        }
    };

    chrome.proxy.settings.set({value: configPac, scope: 'regular'}, function () {
        chrome.storage.local.set({proxyUrl: newProxyServer}, function () {
            console.log('Value is set to ' + newProxyServer);
        });
    });
};

ProxyModule.prototype.pacScriptGenerator = function (poxyServer) {
    var url = poxyServer.url;
    var port = poxyServer.port;
    var type = poxyServer.type;
    var newProxyServer = type + " " + url + ":" + port;

    return "function FindProxyForURL(url, host) {\n" +
        "  if (shExpMatch(url, '*vk.com*') )\n" +
        "    return '" + newProxyServer + "';\n" +
        "  if (shExpMatch(url, '*maximarkets.org*') )\n" +
        "    return '" + newProxyServer + "';\n" +
        "  if (shExpMatch(url, '*whoer.net*') )\n" +
        "    return '" + newProxyServer + "';\n" +
        "  if (shExpMatch(url, '*ok.ru*') )\n" +
        "    return '" + newProxyServer + "';\n" +
        "  return 'DIRECT';\n" +
        "}";
};

ProxyModule.prototype.setIsActive = function (cond) {
    this.isActive = cond;
    chrome.storage.local.set({proxyIsActive: cond}, function () {
    });
};


// init proxyModule
// A generic mechanism for setting proxy data.
// Set initial targetUrl default
// store.quotationsUrl;
// Set initial servers source array

var proxyModule = new ProxyModule();

proxyModule.serversSource = proxySource.servers;

// start change proxy

function handleChangeProxy() {
    var proxyId = proxyModule.proxyId;
    var isActive = proxyModule.isActive;
    var serversSource = proxyModule.serversSource;

    console.log(proxyId, '-', serversSource.length);

    if (!isActive) {
        return;
    }

    if (serversSource.length === 0) {
        return;
    }

    if (!serversSource[proxyId]) {
        proxyModule.proxyId = 0;
        proxyModule.setDefaultProxySettings();
        setTimeout(function () {
            handleChangeProxy();
        }, 60*1000);
        return;
    }

    proxyModule.setProxyServer(serversSource[proxyId]);
}


function handleProxyErrors(error) {
    console.log('Proxyerror');
    proxyModule.proxyId++;
    handleChangeProxy();
}

chrome.proxy.onProxyError.addListener(handleProxyErrors);

//Listen for runtime Message to Enable - Disable proxy server

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    var cmd = request.cmd;

    switch (cmd) {
        case 'toggle-proxy-isActive-true':
            console.log(cmd);
            proxyModule.setIsActive(true);
            handleChangeProxy();
            break;

        case 'toggle-proxy-isActive-false':
            console.log(cmd);
            proxyModule.setIsActive(false);
            proxyModule.setDefaultProxySettings();
            break;
        default:
            return;
    }
});

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set({proxyUrl: "System Proxy"}, function () {
    });
});


chrome.storage.local.get(['proxyIsActive'], function (result) {
    proxyModule.setIsActive(result.proxyIsActive);

    if (result.proxyIsActive) {
        handleChangeProxy();
    }
});


// setInterval(function () {
//     console.log('proxy is active:', proxyModule.isActive)
//     proxyModule.getProxyServer();
//     proxyModule.checkConnection( "https://informer.maximarkets.org/wss/server.ashx?id=0")
//         .then(response => console.log('connection true'))
//         .catch(error => console.log('connection errorr'));
// }, 5000);
//
//
