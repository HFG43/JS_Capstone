const commentsCounter = () => {
  const comments = document.querySelectorAll('.list-items').length;
  const commentsNumber = document.getElementById('comments-header');
  commentsNumber.innerText = `Comments (${comments})`;
};

export default commentsCounter;
