const DATABASE_API = "http://parents-n-parks-2.herokuapp.com/";

const fetchFriendRequests = async (token) => {
    let url = DATABASE_API + 'friends/friend_requests_view/' 
    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('accessToken'),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(),
        })
        let data = await response.json()
        console.log(data)
        if (data.code === 400){
            return {'error': `there was an error ${data.detail}`}
        } else {
            return data
        }
    }
    catch (error) {
        console.log(error)
        return null
    }
}


const acceptFriendRequest = async (reqID) => {
    let url = DATABASE_API + 'friends/accept_request/'
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('accessToken'),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "request_id": reqID
            }),
        })
        let data = await response.json()
        if (data.code === 400){
            return {'error' : `there was an error ${data.detail}`}
        } else {
            return data
        }
    }
    catch (error) {
        console.log(error)
        return null
    }
}

const declineFriendRequest = async (reqID) => {
    let url = DATABASE_API + 'friends/decline_request/'
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('accessToken'),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "request_id": reqID
            }),
        })
        let data = await response.json()
        if (data.code === 400){
            return {'error' : `there was an error ${data.detail}`}
        } else {
            return data
        }
    }
    catch (error) {
        console.log(error)
        return null
    }
}


export {
    fetchFriendRequests,
    acceptFriendRequest,
    declineFriendRequest
}