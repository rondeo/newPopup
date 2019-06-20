export const getInitialSettings = () => {
    const app = chrome.extension.getBackgroundPage().app;
    console.log('init',app.getSettings());
    return app.getSettings();
};

export const toggleToolbar = () => {
    const app = chrome.extension.getBackgroundPage().app;
    app.toolbarToggle();
};

export const toggleProxy = cond => {
    const app = chrome.extension.getBackgroundPage().app;
    app.toggleProxy();

    if (cond) {
        var cmd = 'toggle-proxy-isActive-true';

    } else {
        cmd = 'toggle-proxy-isActive-false';
    }
    chrome.runtime.sendMessage({
        cmd: cmd,
    });
};