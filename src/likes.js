const getLikes = async () => {
  const getAllLikes = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Bi5YfurxCUYnE9wwCG8E/likes');
  const data = await getAllLikes.json();
  return data;
};

const postLike = async (showid) => {
  const response = await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Bi5YfurxCUYnE9wwCG8E/likes',
    {
      method: 'POST',
      body: JSON.stringify({
        item_id: showid,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  );
  const postLikesResponse = await response.text();
  await getLikes();
  return postLikesResponse;
};

export const addLikes = async (search) => {
  const showid = search.id;
  await getLikes();
  await postLike(showid);
  return showid;
};

export const updateLikes = async (showid) => {
  const likesData = await getLikes();
  const likesCounted = document.getElementById(`likes_counter_${showid}`);
  if (likesCounted) {
    const likesCounter = likesData.filter((item) => item.item_id === showid);
    likesCounted.innerText = likesCounter[0].likes;
  }
};