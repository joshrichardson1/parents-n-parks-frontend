const DATABASE_API = "http://parents-n-parks-2.herokuapp.com/";

const fetchFriendById = async (id) => {
    const url = DATABASE_API + 'users/' + `${id}/`;
    try {
        let response = await fetch(url);
        let data = await response.json();
        let error = false;
        if (data.code === 400) {
            return {'error': `there was an error ${data.detail}`};
        } else {
            return data;
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export default fetchFriendById;