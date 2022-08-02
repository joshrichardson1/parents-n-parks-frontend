const DATABASE_API = "http://localhost:8000/";

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
const getFriendsList = async (token) => {
  let url = DATABASE_API + 'friends/friend_info/'
  let init = {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
    redirect: 'follow'
  }
  return await tryCatchFetch(url, init)
};

export default getFriendsList;