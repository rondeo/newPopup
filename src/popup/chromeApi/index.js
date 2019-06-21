const backgroundPage = chrome.extension.getBackgroundPage();
const app = backgroundPage.app;
const settings =  backgroundPage.settings;
const store = backgroundPage.store;

// console.log(backgroundPage.settings);
console.log(backgroundPage.store);

export const getInitialSettings = () => {
    console.log('init', backgroundPage.settings);

    return {
        ...settings,
        ...store
    };
};

export const toggleFilterNews = filterName => {
    app.toggleFilterNews(filterName);
};

export const toggleToolbar = () => {
    app.toggleToolbar();
};

