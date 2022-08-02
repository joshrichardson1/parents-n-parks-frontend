const AUTH0_BASE_URL = 'https://dev-valkjtef.us.auth0.com/api/v2/users/'
const AUTH0_DOMAIN = 'dev-valkjtef.us.auth0.com'

const tryCatchFetch = async (url, init = null) => {
    try {
        let response = await fetch(url, init)
        console.log('responded')
        return await response.json()
    }
    catch (e) {
        console.error(e)
        return null
    }
}


const getMetaData = async (userDetailsByIdUrl, accessToken) => {
    console.log('it got here')
    let url = userDetailsByIdUrl
    let init = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken
        }
      }
    
    return await tryCatchFetch(url, init)
  };

export default {
    getMetaData
}