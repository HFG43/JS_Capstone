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
     </div>
   `;
  document.body.append(popUpContainer);
  const closeBtn = document.getElementById('close-modal-btn');
  closeBtn.addEventListener('click', () => {
    popUpContainer.remove();
  });
};
export default popUp;
