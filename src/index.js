import './style.css';
import Shows from './shows.js';
import { showsContainer, searchForm, searchFormInput } from './dynamic.js';

const setNewShow = (programList) => {
  let tvShows = [];
  programList.forEach((program) => {
    const { id, image } = program.show;
    const title = program.show.name;
    const like = false;
    const newShow = new Shows(id, image, title, like);
    tvShows = [...tvShows, newShow];
  });
  return tvShows;
};

const getTVShows = async (search) => {
  if (search === undefined) {
    search = 'action';
  }
  console.log(search);
  const resultPrograms = await fetch(
    `https://api.tvmaze.com/search/shows?q=${search}`,
  );
  const programList = await resultPrograms.json();
  const newProgramList = setNewShow(programList);
  return newProgramList;
};

const generateShowCard = async (search) => {
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
    const showTitle = document.createElement('h2');
    showTitle.classList.add('card_title');
    showTitle.innerText = show.title;
    showCard.appendChild(showTitle);
    // const likes = document.createElement('img');
    // likes.src = '#';
    // likes.alt = 'like_icon';
    // showCard.appendChild(likes);
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
  generateShowCard(search);
});
