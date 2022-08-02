const SendMessage = async (message) => {

    try {
        const response = await fetch(
          `http://parents-n-parks-2.herokuapp.com/messages/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
            body: JSON.stringify(message),
          }
        );
        const data = await response.json();
        if (data.error){
            return {
                'message': data.error.message,
                'statusCode' : 200
            }
        } return 'Message sent';
    }
    catch(error) {
        console.log(error)
        return null;
    }
  };
  
  export default SendMessage;