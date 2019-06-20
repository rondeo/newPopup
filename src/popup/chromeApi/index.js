export const getProxySettings = () => {
    return new Promise(resolve => {
        chrome.storage.local.get(['proxyIsActive'], result => {
            resolve(result.proxyIsActive);
        });

    })
};

export const getToolbarSettings = () => {
    return new Promise(resolve => {
        chrome.storage.local.get(['mmCrExtSettings'], result => {
            // console.log(result);
            resolve(result.mmCrExtSettings.enableToolbar );
        });
    })
};

export const getCurrentTab = () => {
    return new Promise(resolve => {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            resolve(tabs[0]);
        })
    })
};

export const getInitialSettings = async () => {
    const bg = chrome.extension.getBackgroundPage();
    console.log(bg.settings);
    const proxySettings = await getProxySettings();
    const toolbarSettings = await getToolbarSettings();
    return {
        proxySettings: proxySettings,
        toolbarSettings: toolbarSettings
    }
};

export const toggleToolbar = async () => {
    chrome.runtime.sendMessage({
        cmd: 'toggleWidget-mmCrExt',
    });
};

export const toggleProxy = cond => {

    if (cond) {
        var cmd = 'toggle-proxy-isActive-true';
        chrome.browserAction.setBadgeBackgroundColor({color: "#008b00"});

    } else {
        cmd = 'toggle-proxy-isActive-false';
        chrome.browserAction.setBadgeBackgroundColor({color: "#aaaaaa"});
    }
    chrome.runtime.sendMessage({
        cmd: cmd,
    });
};