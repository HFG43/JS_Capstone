const countAll = () => {
  const selectShows = document.getElementsByClassName('show_container');
  const counter = selectShows.length;
  return counter;
};

const displayCountAll = () => {
  const displayAllCounter = document.getElementById('all_elements_counter');
  const countValue = (countAll()).toString();
  displayAllCounter.innerText = `(${countValue})`;
};

export default displayCountAll;
