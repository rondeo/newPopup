
export const config = {
    src: {
        brandUrl: 'https://www.maximarkets.org/',
        chartsUrl: 'https://www.maximarkets.org/charts-machine',
        calendarUrl: 'https://www.maximarkets.org/financial-calendar',
    },
    quotes: [
        {ID: 23, Name: 'EUR/USD', AskValue: '0.00000', CurrentValue: '0.00000'},
        {ID: 30, Name: 'GBP/USD', AskValue: '0.00000', CurrentValue: '0.00000'},
        {ID: 47, Name: 'USD/JPY', AskValue: '0.00000', CurrentValue: '0.00000'},
        {ID: 52, Name: 'USD/RUB', AskValue: '0.00000', CurrentValue: '0.00000'}
    ],
    events: {
        time: '00:00',
        Name: '',
        Better: false,
        Currency: 'USD',
        Volatility: 0,
        DisplayActual: '',
        DisplayPrevious: '',
        DisplayConsensus: '',
        InternationalCode: 'us',
        DisplayActualColor: '',
        DisplayPreviousColor: '',
        DisplayConsensusColor: '',
    },
    eventsArr: [{
        time: '00:00',
        Name: '',
        Better: false,
        Currency: 'USD',
        Volatility: 0,
        DisplayActual: '',
        DisplayPrevious: '',
        DisplayConsensus: '',
        InternationalCode: 'us',
        DisplayActualColor: '',
        DisplayPreviousColor: '',
        DisplayConsensusColor: '',
    }],
    activeEvent: 0,
    isShowVideo: false,
};