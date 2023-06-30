const createComment = async (movieId, user, comment) => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Bi5YfurxCUYnE9wwCG8E/comments', {
    method: 'POST',
    body: JSON.stringify({
      item_id: movieId,
      username: user,
      comment,

    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const jsonResponse = await response.text();

  document.getElementById('user').value = '';
  document.getElementById('comment').value = '';

  return jsonResponse;
};

const getMovieData = async (movieId) => {
  try {
    const res = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Bi5YfurxCUYnE9wwCG8E/comments?item_id=${movieId}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export {
  createComment,
  getMovieData,
};
