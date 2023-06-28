import { searchFormInput } from './dynamic.js';
import Shows from './shows.js';

const setNewShow = (programList) => {
  let tvShows = [];
  programList.forEach((program) => {
    const {
      id, image, genres, type, runtime, language,
    } = program.show;
    const title = program.show.name;
    const like = false;
    const newShow = new Shows(id, image, title, like, genres, type, runtime, language);
    if (image) {
      tvShows = [...tvShows, newShow];
    }
  });
  return tvShows;
};

const getTVShows = async (search) => {
  if (search === undefined) {
    search = 'action';
  }
  const resultPrograms = await fetch(
    `https://api.tvmaze.com/search/shows?q=${search}`,
  );
  const programList = await resultPrograms.json();
  const newProgramList = setNewShow(programList);
  if (newProgramList.length <= 0) {
    searchFormInput.placeholder = 'Please try with another TV Show or Genre';
    searchFormInput.classList.add('error_input_show');
  }
  return newProgramList;
};

export default getTVShows;
