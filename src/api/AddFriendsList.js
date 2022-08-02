const DATABASE_API = "http://parents-n-parks-2.herokuapp.com/";

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
const addFriendsList = async (token) => {
  let url = DATABASE_API + 'friends/friends_list/'
  let init = {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    },
    redirect: 'follow'
  }
  return await tryCatchFetch(url, init)
};

export default addFriendsList;