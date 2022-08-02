const addNewProfile = async (profile) => {

  try {
      const response = await fetch(
        "http://parents-n-parks-2.herokuapp.com/profiles/",
        {
          method: "POST",
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
      } return 'Profile Created';
  }
  catch(error) {
      console.log(error)
      return null;
  }
};

export default {
  addNewProfile: addNewProfile,
};
