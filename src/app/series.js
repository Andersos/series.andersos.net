import seasons from './seasons';

export function ignored(series) {
  return series.hasOwnProperty('ignored') && series.ignored;
}

export function newSeries(series) {
  return series.hasOwnProperty('lastWatched') && series.lastWatched.slice(-2) === '00';
}

function _lastInSeason(series) { // eslint-disable-line
  if (series.hasOwnProperty('name') && seasons[series.name]) {
    if (series.lastWatched.substring(0, 3) !== seasons[series.name].substring(0, 3)) {
      console.log(`${series.name} is not in the latest season in seasons.`);
    }
    return series.lastWatched === seasons[series.name];
  }
  if (!newSeries(series) && !ignored(series) && series.name !== undefined) {
    console.log(`${series.name} is missing in seasons overview.`);
  }
  return false;
}

export function watching(series) {
  return series.hasOwnProperty('name') && !_lastInSeason(series) && !newSeries(series) && !ignored(series) && !series.cancelled;
}

export function endOfSeason(series) {
  return _lastInSeason(series) && !newSeries(series) && !series.ignored && !series.cancelled;
}

export function done(series) {
  return _lastInSeason(series) && series.hasOwnProperty('cancelled') && series.cancelled;
}
