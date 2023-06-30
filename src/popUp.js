import { getMovieData, createComment } from './comments.js';
import commentsCounter from './commentsCounter.js';

// Pop up function
const popUp = async (show) => {
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
        <h3 id="comments-header"> Comments (0)</h3>
        <ul id="comments-list">
        </ul>
      </div>
      <div class="pop-up-form">
        <h3>Add a comment</h3>
        <form id="new-comment">
          <input id="user" type="text" name="user" placeholder="Your name" required></input>
          <textarea id="comment" name="user" placeholder="Add your comment" required></textarea>
          <button type="submit" class="add-comment" id="comment-btn">Comment</button>
        </form>
      </div>
     </div>
   `;

  document.body.append(popUpContainer);
  show.comments = await (getMovieData(show.id));

  const closeBtn = document.getElementById('close-modal-btn');
  closeBtn.addEventListener('click', () => {
    popUpContainer.remove();
  });
  const renderComments = async () => {
    const commentList = document.getElementById('comments-list');
    commentList.innerHTML = '';

    // Fetch the updated comments and populate the comment list
    const updatedComments = await getMovieData(show.id);
    updatedComments.forEach((comment) => {
      const itemList = document.createElement('li');
      itemList.classList.add('list-items');
      itemList.innerHTML = `
      <div>
        <span>${comment.creation_date} </span>
        <span class="user-name">${comment.username}: </span>
        <span>${comment.comment}</span>
      </div>
    `;
      commentList.appendChild(itemList);
    });
    commentsCounter();
  };
  await renderComments();
  const addCommentBtn = document.getElementById('comment-btn');
  const commentForm = document.getElementById('new-comment');

  addCommentBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const userInput = document.getElementById('user').value;
    const textAreaInput = document.getElementById('comment').value;
    await createComment(show.id, userInput, textAreaInput);
    // Validate that both the user input and comment text are not empty
    if (userInput.trim() === '' || textAreaInput.trim() === '') {
    // Display an error message or take appropriate action
      return;
    }

    // Clear existing comments before adding new ones
    commentForm.reset();
    await renderComments();
  });
  // Add form submit event listener for validation
  commentForm.addEventListener('submit', (e) => {
    const userInput = document.getElementById('user').value;
    const textAreaInput = document.getElementById('comment').value;

    // Validate that both the user input and comment text are not empty
    if (userInput.trim() === '' && textAreaInput.trim() === '') {
    // Display an error message or take appropriate action
      e.preventDefault(); // Prevent form submission
    }
  });
};
export default popUp;
