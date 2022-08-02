const SERAPI_EVENTS_URL = "https://serpapi.com/search.json?engine=google_events&q=Family+Events+in+"

const tryCatchFetch = async (url, init = null) => {
    try {
        let response = await fetch(url, init);
        return await response.json()
    }
    catch (e) {
        console.error(e)
        return null
    }
}

const getEvents = async (location) => {
    let api_key = 'e96f00d013861615c3732975d2215fa059e6ad92740195fb5498df8de6fd9f06'
    // let url = SERAPI_EVENTS_URL + `${location}&hl=en&gl=us&api_key=${api_key}`;
    let url = SERAPI_EVENTS_URL + `${location}&api_key=${api_key}`;
    
    let init = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    
    return await tryCatchFetch(url, init)
  };

export default {
    getEvents: getEvents,
}