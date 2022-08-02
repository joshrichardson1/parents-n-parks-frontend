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
const createUser = async (token) => {
  let url = DATABASE_API + 'users/'
  let init = {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    },
    redirect: 'follow'
  }
  return await tryCatchFetch(url, init)
};

const getUserProfile = async (token) => {
  let url = DATABASE_API + 'profiles/'
  let init = {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
    redirect: 'follow'
  }
  return await tryCatchFetch(url, init)
};

const getProfile = async (token) => {
  let url = DATABASE_API + 'profiles/'
  let init = {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
    redirect: 'follow'
  }
  return await tryCatchFetch(url, init)
};

const getKids = async (token) => {
  let url = DATABASE_API + 'kids/'
  let init = {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
    redirect: 'follow'
  }
  return await tryCatchFetch(url, init)
};

const getUser = async (token) => {
  let url = DATABASE_API + 'users/'
  let init = {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
    redirect: 'follow'
  }
  return await tryCatchFetch(url, init)
};

const getDummy = async (token) => {
  let url = DATABASE_API + 'private'
  let init = {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
    redirect: "follow"
  }
  return await tryCatchFetch(url, init)
};

const fetchProfiles = async () => {
  try {
    let response = await fetch(DATABASE_API + 'profiles/?all=true');
    let data = await response.json();
    let error = false;
    if (data.code === 400) {
      return { 'error': `there was an error ${data.detail}` };
    } else {
      return data;
    }
  }
  catch (error) {
    console.log(error);
    return null;
  }
};

const getEvents = async () => {
  let url = DATABASE_API + "events/";
  let init = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    redirect: "follow",
  };
  return await tryCatchFetch(url, init);
};

const addEvent = async (event) => {
  let url = DATABASE_API + "events/";
  let init = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
    redirect: "follow",
  };
  return await tryCatchFetch(url, init);
};

const fetchWeather = async (zip) => {
  let url = `${DATABASE_API}fetch-weather/?zip=${zip}`;
  let init = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    redirect: "follow",
  };
  return await tryCatchFetch(url, init);
}


const fetchEvent = async (zip) => {
  if (zip) {
    console.log('fetch event')
    let url = `${DATABASE_API}serpapiData/?zip=${zip}`
    let init = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      redirect: "follow",
    }
    return await tryCatchFetch(url, init);
  }
}

export {
  createUser,
  getProfile,
  getUserProfile,
  fetchProfiles,
  getDummy,
  getUser,
  getKids,
  getEvents,
  addEvent,
  fetchWeather,
  fetchEvent,
}
