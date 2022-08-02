const EditProfile = async (profile) => {

    try {
        const response = await fetch(
          `http://parents-n-parks-2.herokuapp.com/profiles/${profile.id}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
            body: JSON.stringify(profile),
          }
        );
        const data = await response.json();
        if (data.error){
            return {
                'message': data.error.message,
                'statusCode' : 200
            }
        } return 'Profile updated';
    }
    catch(error) {
        console.log(error)
        return null;
    }
  };
  
  export default EditProfile;
  