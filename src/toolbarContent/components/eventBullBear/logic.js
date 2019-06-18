
const urlBearGrey = '/img/bear_grey.svg';
const urlBear = '/img/bear.svg';
const urlBullGrey = '/img/bull_grey.svg';
const urlBull = '/img/bull.svg';

export const getImageSrc = (better, volatility, place) => {
    if(volatility < place) {
        return better ? urlBullGrey : urlBearGrey;
    }
    return better ? urlBull : urlBear;
};
