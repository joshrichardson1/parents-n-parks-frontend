const MarkMsgAPI = async (message_id) => {
    console.log(message_id)
    try {
        const response = await fetch(
          `http://parents-n-parks-2.herokuapp.com/messages/${message_id}/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
            body: JSON.stringify({ pk: message_id, unread: false }),
          }
        );
        const data = await response.json();
        if (data.error){
            return {
                'message': data.error.message,
                'statusCode' : 200
            }
        } return 'message is read';
    }
    catch(error) {
        console.log(error)
        return null;
    }
  };
  
  export default MarkMsgAPI;