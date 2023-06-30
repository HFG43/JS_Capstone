import { selectShows, displayAllCounter } from './dynamic.js';

const countAll = async () => {
  const counter = selectShows.length;
  return counter;
};

const displayCountAll = async () => {
  const countValue = (await countAll()).toString();
  displayAllCounter.innerText = `(${countValue})`;
};

export default displayCountAll;