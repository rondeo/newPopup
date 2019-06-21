var store = {
    "economicalEvent": {
        "arrayByInstrument": [],
    },
    "timeOut": {
        "time1000": 1000,
        "time900000": 900000,
    },
    "quotations": {
        "data": [
            {
                "ID": 23,
                "Name": "EUR/USD",
                "AskValue": "0",
                "CurrentValue": "0",
                "isChange": false,
                "fontColor": "darkgray"
            },
            {
                "ID": 30,
                "Name": "GBP/USD",
                "AskValue": "0",
                "CurrentValue": "0",
                "isChange": false,
                "fontColor": "darkgray"
            },
            {
                "ID": 47,
                "Name": "USD/JPY",
                "AskValue": "0",
                "CurrentValue": "0",
                "isChange": false,
                "fontColor": "darkgray"
            },
            {
                "ID": 52,
                "Name": "USD/RUB",
                "AskValue": "0",
                "CurrentValue": "0",
                "isChange": false,
                "fontColor": "darkgray"
            }
        ],
    },
    "quotationsUrl": "https://informer.maximarkets.org/wss/server.ashx?id=0",
    "eventsUrl": "https://news.maximarkets.org/events",

};

checkDataTime1();
checkDataTime2();

function checkDataTime1() {
    getEconomicalEvent();
    setTimeout(function () {
        checkDataTime1();
    }, store.timeOut.time900000)
}

function checkDataTime2() {
    getDataQuotations();
    sendMessageToUpdateKotirovkiOnToolBar();
    setTimeout(function () {
        checkDataTime2();
    }, store.timeOut.time1000)
}

// get JSON data from url

function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    xhr.send();
};

// request for EconomicalEvent

function getEconomicalEvent() {
    getJSON(store.eventsUrl, function (err, data) {
        // $.getJSON('http://192.168.1.222:3001/newsapi/events/?f=json&culture=en&view=range&start=20170914&end=20170914&timezone=Russian+Standard+Time', function(data) {
        if (err) {
            console.log('Something went wrong: ' + err);
        } else {
            handleEconomicalEvents(data);
        }
    });
}

// handle response for EconomicalEvent

function handleEconomicalEvents(data) {
    var today = new Date().getDate();
    var now = new Date().getTime();
    var filteredData = data.filter(function (event) {
        return event.DateTime.Day === today;
    });

    store.economicalEvent.arrayByInstrument = [];
    filteredData.forEach(function (param, index) {

        var obj = getEventObj(param);
        store.economicalEvent.arrayByInstrument.push(obj);
    });
    sendMessageToUpdateEconomicalEventOnToolBar();
}

// transform data for toolbar

function getEventObj(param) {
    var obj = {};
    obj.InternationalCode = param.InternationalCode;
    obj.Currency = param.Currency;
    obj.Volatility = param.Volatility;
    obj.Name = param.Name;

    var color = checkColor(param.DisplayPrevious, param.DisplayActual);
    obj.DisplayActualColor = color;
    obj.DisplayActual = param.DisplayActual;

    obj.DisplayPreviousColor = color;
    obj.DisplayPrevious = param.DisplayPrevious;

    obj.DisplayConsensusColor = '#28678d';
    obj.DisplayConsensus = param.DisplayConsensus;

    obj.Time = param.DateTime.Hour + ':' + (param.DateTime.Minute == '0' ? '00' : param.DateTime.Minute);
    obj.Better = param.Better; // бык - зеленый - better === true, медведь - красный - better === false

    return obj;
}

// logic - choose color

function checkColor(displayPrevious, displayActual) {
    if (!displayPrevious || !displayActual) {
        return '#28678d';
    }

    var dp = parseFloat(displayPrevious);
    var da = parseFloat(displayActual);

    if (dp < da) {
        return 'green';
    }
    if (dp > da) {
        return 'red';
    } else {
        return '#28678d';
    }
}


function getDataQuotations() {
    getJSON(store.quotationsUrl,
        function (err, data) {
            if (err) {
                console.log('Something went wrong: ' + err);
            } else {
                parsDataKotirovki(data);
            }
        });
}

function parsDataKotirovki(data) {
    if (!data) {
        return;
    }

    store.quotations.data.forEach(function (elem, index) {
        var currentElement = data.filter(function (item) {
            return item.FullName === elem.Name;
        })[0];

        var array = {
            "quoteAsk": parseFloat(elem.AskValue),
            "quoteBid": parseFloat(elem.CurrentValue),
            "paramAsk": parseFloat(currentElement.AskValue),
            "paramBid": parseFloat(currentElement.CurrentValue),
        };
        if (array.quoteAsk != array.paramAsk || array.quoteBid != array.paramBid) {
            var midle = (array.paramBid + array.paramAsk) / 2 - (array.quoteAsk + array.quoteBid) / 2;
            if (midle < 0) {
                elem.fontColor = "red";
            } else {
                elem.fontColor = "green";
            }
            elem.isChange = true;
            elem.AskValue = currentElement.AskValue;
            elem.CurrentValue = currentElement.CurrentValue;
        } else {
            elem.isChange = false;
        }
    });
}

function showNotification(text, body) {

    var options = {
        body: body,
        icon: '/img/icon128.png'
    };

    Notification.requestPermission().then(function (result) {
        console.log(result);

        var notification = new Notification(text, options);
    });

    var opt = {
        type: "basic",
        title: "AAA",
        message: "Some message",
        iconUrl: "/img/icon128.png"
    }

    // chrome.notifications.create('1', opt, function (){})
}

function sendMessageToUpdateEconomicalEventOnToolBar() {
    var objjson = JSON.stringify(store.economicalEvent.arrayByInstrument);
    chrome.runtime.sendMessage({
        cmd: 'economicalEvent.set-mmCrExt',
        data: objjson
    });
    // console.log(objjson);
    // showNotification(store.economicalEvent.arrayByInstrument[0].Name, store.economicalEvent.arrayByInstrument[0].Time)
    // showNotification(store.economicalEvent.arrayByInstrument[1].Name, store.economicalEvent.arrayByInstrument[1].Time)
    // showNotification(store.economicalEvent.arrayByInstrument[2].Name, store.economicalEvent.arrayByInstrument[2].Time)
}

function sendMessageToUpdateKotirovkiOnToolBar() {
    var objjson = JSON.stringify(store.quotations.data);
    chrome.runtime.sendMessage({
        cmd: 'kotirovki.set-mmCrExt',
        data: objjson
    });
}


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        var cmd = request.cmd;
        switch (cmd) {
            case 'update.data-mmCrExt':
                sendMessageToUpdateEconomicalEventOnToolBar();
                break;
            default:
                return;
        }
    }
);
