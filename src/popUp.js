import { getMovieData, createComment } from './comments.js';

// Pop up function
const popUp = async (show) => {
  show.comments = await (getMovieData(show.id));
  const popUpContainer = document.createElement('article');
  popUpContainer.id = 'pop-up';
  popUpContainer.innerHTML = `
    <div class="pop-container">
       <div class="pop-up-header">
        <h2 class="movie-title">${show.title}</h2>
        <button id="close-modal-btn">x</button>
       </div>
      <div class="pop-up-body">
        <div class="image-container">
         <img src='${show.image.original}' class="movie-image">
        </div>
         <div class="pop-up-content">
          <div class="left-content">
            <label>Genre:</label>
             <div class="movie-data">${show.genres[0]}</div>
             <label>RunTime:</label>
            <div class="movie-data">${show.runtime}</div>
           </div>
           <div class="right-content">
             <label>Show Type:</label>
             <div class="movie-data">${show.type}</div>
             <label>Language:</label>
             <div class="movie-data">${show.language}</div>
           </div>
         </div>
       </div>
       <div class="pop-up-comments">
        <h3>Comments (${show.comments.length})</h3>
        <ul id="comments-list"></ul>
      </div>
      <div class="pop-up-form">
        <h3>Add a comment</h3>
        <form id="new-comment">
          <input id="user" type="text" name="user" placeholder="Your name" required></input>
          <textarea id="comment" name="user" placeholder="Add your comment" required></textarea>
          <button class="add-comment" id="comment-btn">Comment</button>
        </form>
      </div>
     </div>
   `;
  document.body.append(popUpContainer);
  const closeBtn = document.getElementById('close-modal-btn');
  closeBtn.addEventListener('click', () => {
    popUpContainer.remove();
  });
  const addComentBtn = document.getElementById('comment-btn');
  addComentBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const userInput = document.getElementById('user').value;
    const textAreaInput = document.getElementById('comment').value;
    createComment(show.id, userInput, textAreaInput);
  });
  const commentList = document.getElementById('comments-list');
  if (show.comments.length > 0) {
    show.comments.map((show) => {
      const itemList = document.createElement('li');
      itemList.innerHTML = `
        <div>
          <span>${show.creation_date} </span>
          <span class="user-name">${show.username}: </span>
          <span>${show.comment}</span>
        </div>
      `;
      return commentList.append(itemList);
    });
  }
};
export default popUp;
