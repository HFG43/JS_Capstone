// const postAppForID = async () => {
//   const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/', {
//     method: 'POST',
//   });

//   if (response.ok) {
//     const data = await response.text;
//     console.log(data);
//     const nameResult = data.result;
//     return nameResult;
//   }
//   return response;
// };
async function postAppForID() {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  const appId = await response.text();
  console.log(appId);
  return appId;
}
export default postAppForID;

// UgcwqV0d93hZ6oEAsKZi