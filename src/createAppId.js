async function postAppForID() {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/', {
    method: 'POST',
  });

  const result = await response.json();
  console.log('Success:', result);
};

export default postAppForID;