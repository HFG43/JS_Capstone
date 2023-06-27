import './style.css';

const showsContainer = document.querySelector('.main_content_container');
const searchForm = document.querySelector('form');
const searchFormInput = document.getElementById('search_text');

class Shows {
  constructor(id, image, title, like) {
    this.id = id;
    this.image = image;
    this.title = title;
    this.like = like;
  }
}

const getTVShows = async (search) => {
  const resultPrograms = await fetch(
    `https://api.tvmaze.com/search/shows?q=${search}`,
  );
  console.log(resultPrograms);
  const programList = await resultPrograms.json();
  await generateShowCard();
  // return programList;
};

// const getTVShows = async (search) => {
//   console.log(search);
//   const resultPrograms = await fetch(
//     `https://api.tvmaze.com/search/shows?q=${search}`,
//   );
//   console.log(resultPrograms);
//   const programList = await resultPrograms.json();
//   return programList;
// };

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const search = searchFormInput.value;
  searchForm.reset();
  await getTVShows(search);
//   await generateShowCard();
});

const setNewShow = async () => {
  const programList = await getTVShows();
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
setNewShow();

const generateShowCard = async () => {
  const tvShows = await setNewShow();
  tvShows.forEach((show) => {
    const showCard = document.createElement('div');
    showCard.classList.add('show_container');
    const showImage = document.createElement('img');
    showImage.classList.add('show_image');
    if(show.image) {
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
generateShowCard();