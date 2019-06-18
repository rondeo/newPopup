export const init = () => {
    window.parent.postMessage({cmd: 'widget.ready-mmCrExt'}, '*');
};

export const dataListener = callback => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        sendResponse(callback(request));
    })
};

export const updateDataEconEvents = () => {
    chrome.runtime.sendMessage({
        cmd: 'update.data-mmCrExt',
    })
};

export const openNewTab = (newURL) => {
    chrome.tabs.create({url: newURL});
};

export const toggleVideo = (cond) => {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id,
            {
                cmd: 'toggleVideo-mmCrExt',
                data: cond
            });
    });
};

export const closeToolbar = () => {
    chrome.runtime.sendMessage({
        cmd: 'toggleWidget-mmCrExt'
    })
};

export const showNotification = (text, body) => {

    var options = {
        body: body,
        icon: '/img/icon128.png'
    };

    Notification.requestPermission().then(function (result) {
        console.log(result);

        var notification = new Notification(text, options);
    });
};


