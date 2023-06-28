import './style.css';
import Shows from './shows.js';
import { showsContainer, searchForm, searchFormInput } from './dynamic.js';
import likes from './images/Empty_Like.svg';

const bookList = document.getElementById('book-list');
const setNewShow = (programList) => {
  let tvShows = [];
  programList.forEach((program) => {
    const { id, image } = program.show;
    const title = program.show.name;
    const like = false;
    const newShow = new Shows(id, image, title, like);
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
    searchFormInput.placeholder = 'Please try with another TV Show';
    searchFormInput.classList.add('error_input_show');
  }
  return newProgramList;
};

const displayShows = async (search) => {
  showsContainer.innerHTML = '';
  searchFormInput.placeholder = 'Type Search your favorite TV show or Genre';
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
    // Pop up function
    const popUp = async (pick) => {
      // Make the API call to fetch comments for the selected item
      const commentsResponse = await fetch(`https://api.tvmaze.com/search/shows?q=${search}`);
      const commentsData = await commentsResponse.json();

      // Store the comments in the pick object
      pick.comments = commentsData;

      const popUpContainer = document.createElement('article');
      popUpContainer.id = 'pop-up';
      popUpContainer.innerHTML = `
    <div class="pop-container">
      <div class="pop-up-header">
        <h2 class="movie-title">${pick.title}</h2>
        <button id="close-modal-btn">x</button>
      </div>
      <div class="pop-up-body">
        <div class="image-container">
          <img src='${pick.image.medium}' class="movie-image">
        </div>
        <div class="pop-up-content">
          <div class="left-content">
            <label>Genre:</label>
            <div class="movie-data">${pick.genres}</div>
            <label>RunTime:</label>
            <div class="movie-data">${pick.country}</div>
          </div>
          <div class="right-content">
            <label>Show Type:</label>
            <div class="movie-data">${pick.type}</div>
            <label>Language:</label>
            <div class="movie-data">${pick.language}</div>
          </div>
        </div>
      </div>
    </div>
  `;
      document.body.append(popUpContainer);
      const closeBtn = document.getElementById('close-modal-btn');
      closeBtn.addEventListener('click', () => {
        popUpContainer.remove();
      });
    };

    showsContainer.appendChild(showCard);
    commentButton.addEventListener('click', () => {
      popUp(show);
    });
  });
};

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const search = searchFormInput.value;
  searchForm.reset();
  displayShows(search);
});
