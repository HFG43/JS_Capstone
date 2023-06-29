// ADD EVENT LISTENER TO LIKES
// GET LIKES COUNT PER ID
// GENERATE COUNTER USING INITIAL NUMBER
// POST LIKES ID ++
// SHOW IN LIKES

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
  console.log(postLikesResponse);
  await getLikes();
  return postLikesResponse;
};

const getLikes = async () => {
  const getAllLikes = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Bi5YfurxCUYnE9wwCG8E/likes');
  const data = await getAllLikes.json();
  console.log(data);
  return data;
};

const addLikes = async (search) => {
  const showid = search.id;
  await getLikes();
  return showid;
};

export default addLikes;