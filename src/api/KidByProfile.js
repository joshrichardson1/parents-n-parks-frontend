const DATABASE_API = "http://127.0.0.1:8000/";

const tryCatchFetch = async (url, init = null) => {
  try {
    let response = await fetch(url, init);
    return await response.json()
  }
  catch (e) {
    console.error(e)
    return null
  }
};

// createUser is not needed anymore
const getKidByProfile = async (token, profileID) => {
  let url = DATABASE_API + 'kids/?friend/'
  let init = {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
    redirect: 'follow',
    body: `profile_id: ${profileID}`
  }
  return await tryCatchFetch(url, init)
};

export default getKidByProfile;