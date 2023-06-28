import './style.css';
import Shows from './shows.js';
import { showsContainer, searchForm, searchFormInput } from './dynamic.js';
import likes from './images/Empty_Like.svg';

export let showCard; export let
  commentButton; export let search; export let
  show;
const setNewShow = (programList) => {
  let tvShows = [];
  programList.forEach((program) => {
    const { id, image, genres, type, runtime, language } = program.show;
    const title = program.show.name;
    const like = false;
    const newShow = new Shows(id, image, title, like, genres, type, runtime, language);
    console.log(newShow);
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

// eslint-disable-next-line import/prefer-default-export
export const displayShows = async (search) => {
  showsContainer.innerHTML = '';
  searchFormInput.placeholder = 'Search for your favorite TV show or Genre';
  searchFormInput.classList.remove('error_input_show');
  const tvShows = await getTVShows(search);
  tvShows.forEach((show) => {
    const showCard = document.createElement('div');
    showCard.classList.add('show_container');

    const showImage = document.createElement('img');
    showImage.classList.add('show_image');
    if (show.image) {
      showImage.src = show.image.original;
    } else {
      showImage.src = '#';
    }
    showCard.appendChild(showImage);

    const titleLikeContainer = document.createElement('div');
    titleLikeContainer.classList.add('title_like_container');

    const showTitle = document.createElement('h2');
    showTitle.classList.add('card_title');
    showTitle.innerText = show.title;
    titleLikeContainer.appendChild(showTitle);

    const likesIcon = document.createElement('img');
    likesIcon.src = likes;
    likesIcon.alt = 'like_icon';
    likesIcon.classList.add('like_icon');
    titleLikeContainer.appendChild(likesIcon);
    showCard.appendChild(titleLikeContainer);

    const commentButton = document.createElement('button');
    commentButton.type = 'button';
    commentButton.innerText = 'Comments';
    commentButton.classList.add('comment_button');
    showCard.appendChild(commentButton);

    showsContainer.appendChild(showCard);
  });
};

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const search = searchFormInput.value;
  searchForm.reset();
  displayShows(search);
});
