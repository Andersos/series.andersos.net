import assert from 'assert';
import { newSeries, watching, ignored, endOfSeason, done } from '../src/app/series';

describe('Series', () => {
  describe('newSeries', () => {
    it('should return false when the value is not present', () => {
      assert.equal(false, newSeries(''));
    });

    it('should return false when the value is first episode', () => {
      assert.equal(false, newSeries({ lastWatched: 'S01E01' }));
    });

    it('should return true when the value is zero', () => {
      assert.equal(true, newSeries({ lastWatched: 'S01E00' }));
    });
  });

  describe('watching', () => {
    it('should return false when the value is not present', () => {
      assert.equal(false, watching({}));
    });

    it('should return false when the series is ignored', () => {
      assert.equal(false, watching({ ignored: true }));
    });

    it('should return false when the last watched is end of season', () => {
      assert.equal(false, watching({ name: 'Betas', lastWatched: 'S01E11' }));
    });

    it('should return false when the series is a new series', () => {
      assert.equal(false, watching({ nlastWatched: 'S01E00' }));
    });

    it('should return true when the series is is being watched', () => {
      assert.equal(true, watching({ name: 'Betas', lastWatched: 'S01E01' }));
    });
  });

  describe('ignored', () => {
    it('should return false when the ignore value is not present', () => {
      assert.equal(false, ignored({}));
    });

    it('should return false when the ignore value is false', () => {
      assert.equal(false, ignored({ ignored: false }));
    });

    it('should return true when the ignore value is true', () => {
      assert.equal(true, ignored({ ignored: true }));
    });
  });

  describe('endOfSeason', () => {
    it('should return false when the value is not present', () => {
      assert.equal(false, endOfSeason({}));
    });

    it('should return false when not the last episode in a season', () => {
      assert.equal(false, endOfSeason({ name: 'Betas', lastWatched: 'S01E10' }));
    });

    it('should return true when it is the last episode in a season', () => {
      assert.equal(true, endOfSeason({ name: 'Betas', lastWatched: 'S01E11' }));
    });

    it('should return false when it is the last episode in a season and ignored', () => {
      assert.equal(false, endOfSeason({ name: 'Betas', lastWatched: 'S01E11', ignored: true }));
    });

    it('should return false when it is the last episode in a season and cancelled', () => {
      assert.equal(false, endOfSeason({ name: 'Betas', lastWatched: 'S01E11', cancelled: true }));
    });
  });

  describe('done', () => {
    it('should return false when the value is not present', () => {
      assert.equal(false, done({}));
    });

    it('should return false when not the last episode in a season', () => {
      assert.equal(false, done({ name: 'Betas', lastWatched: 'S01E10', cancelled: true }));
    });

    it('should return false when not cancelled', () => {
      assert.equal(false, done({ name: 'Betas', lastWatched: 'S01E11', cancelled: false }));
    });

    it('should return true when it is cancelled and last episode', () => {
      assert.equal(true, done({ name: 'Betas', lastWatched: 'S01E11', cancelled: true }));
    });
  });
});
