import Moment from 'moment';
import {DAY_FILTER_KEY, MONTH_FILTER_KEY, WEEK_FILTER_KEY} from "../screens/main/reports";
import {getLastMinuteFromTodayDate, getTodayDate} from "./common";

// Input: dataset -> list of log object.
//        dateOfInterest -> Date object specifying which date to filter
//        xExtractor -> function to extract the datestring of log
// Description: filters the entry to only show the dateOfInterest
function filterToDayData(dataset, dateOfInterest, xExtractor) {
    let result = [];
    const datestringOfInterest = Moment(dateOfInterest).format('DD/MM/YYYY');
    const isOnSameDay = (cmpDate) => Moment(cmpDate, 'DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY') === datestringOfInterest;
    for (const data of dataset) {
        if (isOnSameDay(xExtractor(data))) {
            result.push(data);
        }
    }
    return result;
}

// Input: monthDataset -> list of log object.
//        endDateOfInterest -> Date object specifying end date.
//        xExtractor -> function to extract the datestring in log
// Description: filters the entry to only show the dateOfInterest
function filterToWeekData(monthDataset, endDateOfInterest, xExtractor) {
    let result = [];
    const startDate = Moment(endDateOfInterest).subtract(6, 'days');
    const endDate = Moment(endDateOfInterest).add(1, 'day');
    const isBetweenDateRange = (cmpDate) => {
        return Moment(cmpDate, 'DD/MM/YYYY HH:mm:ss').isBetween(startDate, endDate);
    }
    for (const data of monthDataset) {
        if (isBetweenDateRange(xExtractor(data))) {
            result.push(data);
        }
    }
    return result;
}

function squashToXY(dataset, xExtractor, yExtractor) {
    let result = [];
    for (const d of dataset) {
        const datapoint = {
            x: xExtractor(d),
            y: yExtractor(d)
        };
        result.push(datapoint);
    }
    return result;
}

// partition datapoints
function partitionDataPoints(dataset) {
    const len = dataset.length;
    if (len === 0) return [];

    let result = [];
    let i = 0;
    const initialFormat = 'DD/MM/YYYY HH:mm:ss';
    const cmpFormat = 'DD/MM/YYYY';

    while (i < len) {
        let j = 0;
        let logsForThisDate = [];
        let startDate = Moment(dataset[i].x, initialFormat).format(cmpFormat);
        while (i+j < len && Moment(dataset[i+j].x, initialFormat).format(cmpFormat) === startDate ) {
            logsForThisDate.push(dataset[i+j]);
            j++;
        }
        result.push(logsForThisDate);
        i = i + j;
    }
    return result;
}

function processData(filterKey, originalDataset, xExtractor, yExtractor, combinerMethod) {
    let dataset = originalDataset.map(x => x);
    if (filterKey === WEEK_FILTER_KEY) {
        dataset = filterToWeekData(dataset, new Date(), xExtractor);
    }

    if (filterKey === DAY_FILTER_KEY) {
        dataset = filterToDayData(dataset, new Date(), xExtractor);
    }

    const squashedToXY = squashToXY(dataset, xExtractor, yExtractor);

    if (filterKey === WEEK_FILTER_KEY || filterKey === MONTH_FILTER_KEY) {
        const partitionDataset = partitionDataPoints(squashedToXY);
        let result = [];
        for (const dayLogs of partitionDataset) {
            let flattenedValue = dayLogs.reduce((acc, curr, index) => acc + curr.y, 0);
            if (combinerMethod === 'average' && dayLogs.length != 0) {
                flattenedValue = flattenedValue / dayLogs.length;
            }
            result.push({x: Moment(dayLogs[0].x, 'DD/MM/YYYY').toDate(), y: flattenedValue});
        }
        return result;
    }
    return squashedToXY.map(x => x).map(d => {
        d.x = Moment(d.x, 'DD/MM/YYYY HH:mm:ss').toDate();
        return d;
    });
}

function generateXAxisLabels(filterKey) {
    let result = [];
    const today = Moment(Moment(new Date()).format('DD/MM/YYYY'), 'DD/MM/YYYY');
    if (filterKey === DAY_FILTER_KEY) {
        for (let i = 0; i <= 24; i = i + 6) {
            if (i == 24) {
                result.push(today.clone().add(23, 'hours').add(59, 'minutes').toDate());
            } else {
                result.push(today.clone().add(i, 'hours').toDate());
            }
        }
    } else if (filterKey === WEEK_FILTER_KEY) {
        for (let i = 6; i >= 0; i=i-1) {
            result.push(today.clone().subtract(i, 'days').toDate());
        }
    } else if (filterKey === MONTH_FILTER_KEY) {
        for (let i = 4; i >=0; i = i-1) {
            result.push(today.clone().subtract(i, 'weeks').toDate());
        }
    }
    return result.reverse();
}

function getBinCount(data, keyExtractor, binQuantityAccessor) {
    let result = {};
    for (const d of data) {
        const key = keyExtractor(d);
        if (!(key in result)) {
            result[key] = 0;
        }
        result[key] += binQuantityAccessor(d);
    }
    if (Object.keys(result).length === 0 && result.constructor === Object) {
        return -1;
    }
    return result;
}

function generateYAxisValues(stepSize, startsFrom, maxY) {
    let res = [];
    for (let i = startsFrom; i <= maxY; i = i + stepSize){
        res.push(i);
    }
    return res;
}

function formatY(yValue) {
    if (yValue >= 1000000) {
        return String(Math.round(yValue / 100000) / 10) + " M";
    } else if (yValue >= 1000) {
        return String(Math.round(yValue / 100) / 10) + " K";
    } else {
        return String(Math.round(yValue * 100) / 100);
    }
}

function getYStepSize(minY, maxY) {
    const numOfTicks = 8;
    const evenlySpaceStepSize = Math.round((maxY - minY) / numOfTicks);
    const stringForm = String(evenlySpaceStepSize);
    const msb = parseInt(stringForm[0]);
    const stepSize = msb * Math.pow(10, stringForm.length - 1);
    return stepSize;
}

export {filterToDayData, filterToWeekData, partitionDataPoints, getBinCount, squashToXY, processData, generateYAxisValues, generateXAxisLabels, formatY, getYStepSize};
