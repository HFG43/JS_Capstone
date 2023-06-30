const validateCommentsContainer = (commentsContainer) => {
  if (!commentsContainer || typeof commentsContainer.querySelectorAll !== 'function') {
    return false;
  }
  return true;
};

const commentsCounter = (commentsContainer) => {
  if (!validateCommentsContainer(commentsContainer)) {
    throw new Error('Invalid comments container');
  }

  const comments = commentsContainer.querySelectorAll('.comment').length;
  const commentsNumber = document.getElementById('comments-header');
  commentsNumber.innerText = `Comments (${comments})`;
};

export default commentsCounter;
