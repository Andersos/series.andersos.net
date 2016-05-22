import seasons from './seasons.js';

function _lastInSeason (series) {
  if (series.hasOwnProperty('name') && seasons[series.name]) {
    return series.lastWatched === seasons[series.name];
  } else {
    if (!newSeries(series) && !ignored(series) && series.name !== undefined) {
      console.log(series.name + ' is missing in seasons overview');
    }
    return false;
  }
}

export function watching (series) {
  return series.hasOwnProperty('name') && !_lastInSeason(series) && !newSeries(series) && !series.ignored && !series.cancelled;
}

export function ignored (series) {
  return series.hasOwnProperty('ignored') && series.ignored;
}

export function newSeries (series) {
  return series.hasOwnProperty('lastWatched') && series.lastWatched.slice(-2) === '00';
}

export function endOfSeason (series) {
  return _lastInSeason(series) && !newSeries(series) && !series.ignored && !series.cancelled;
}

export function done (series) {
  return _lastInSeason(series) && series.hasOwnProperty('cancelled') && series.cancelled;
}
