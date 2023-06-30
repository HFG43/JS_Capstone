import './style.css';
import Shows from './shows.js';
import {
  showsContainer, searchForm, searchFormInput,
} from './dynamic.js';
import likes from './images/Empty_Like.svg';
import popUp from './popUp.js';
import { addLikes, loadLikes, updateLikes } from './likes.js';
import { getMovieData } from './comments.js';
import displayCountAll from './allItemsCounter.js';

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
    searchFormInput.placeholder = 'No data found, please try another show or refresh the page';
    searchFormInput.classList.add('error_input_show', 'error_input_show_height');
  }
  return newProgramList;
};

const displayShows = async (search) => {
  showsContainer.innerHTML = '';
  searchFormInput.placeholder = 'Search for your favorite TV show';
  searchFormInput.classList.remove('error_input_show');
  const tvShows = await getTVShows(search);
  tvShows.forEach(async (show) => {
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
    likesIcon.addEventListener('click', async () => {
      await addLikes(show);
      await updateLikes(show.id);
    });
    titleLikeContainer.appendChild(likesIcon);
    showCard.appendChild(titleLikeContainer);

    const likesCounter = document.createElement('span');
    likesCounter.id = `likes_counter_${show.id}`;
    likesCounter.classList.add('likes_counter');
    likesCounter.innerText = 0;
    titleLikeContainer.appendChild(likesCounter);

    const commentButton = document.createElement('button');
    commentButton.type = 'button';
    commentButton.innerText = 'Comments';
    commentButton.id = show.id;
    commentButton.classList.add('comment_button');
    commentButton.addEventListener('click', async () => {
      show.comments = await getMovieData(show.id);
      await popUp(show);
    });
    showCard.appendChild(commentButton);
    showsContainer.appendChild(showCard);
    await loadLikes(show.id);
  });
  await displayCountAll();
};

window.addEventListener('DOMContentLoaded', async () => {
  const search = 'action';
  await displayShows(search);
});

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const search = searchFormInput.value;
  searchForm.reset();
  displayShows(search);
});