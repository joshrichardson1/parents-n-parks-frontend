const getCity  = async (zipcode) => {
    console.log(zipcode)
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=a89006ea84c89b1e55cbddbd599b8f4c");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
        let response = await fetch('http://ziptasticapi.com/' + zipcode, requestOptions)
        let data = await response.json();
        if (data.code === 400){
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

  export {
    getCity,
  }