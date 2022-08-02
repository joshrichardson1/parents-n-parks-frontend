const addKid = async (kid) => {

  try {
    const response = await fetch(
      "http://parents-n-parks-2.herokuapp.com/kids/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        body: JSON.stringify(kid),
      }
    );
    const data = await response.json();
    if (data.error) {
      return {
        message: data.error.message,
        statusCode: 200,
      };
    }
    console.log("Kid Added");
    return "Kid Added";
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteKid = async (kid) => {

  try {
    const response = await fetch(
      "http://parents-n-parks-2.herokuapp.com/kids/",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        body: JSON.stringify(kid),
      }
    );
    const data = await response.json();
    if (data.error) {
      return {
        message: data.error.message,
        statusCode: 200,
      };
    }
    console.log("Kid Deleted");
    return "Kid Deleted";
  } catch (error) {
    console.log(error);
    return null;
  }
};

export {
  addKid,
  deleteKid
};
