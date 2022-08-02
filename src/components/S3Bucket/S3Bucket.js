import React, { useState, useEffect } from "react";
import { uploadFile } from "react-s3";
import { getUser } from '../../api/backendAPI';
import { Button } from '@mui/material';
import SuccessToast from "../SuccessToast/SuccessToast";

window.Buffer = window.Buffer || require("buffer").Buffer;

const S3Bucket = (props) => {
  const [userID, setUserID] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const config = {
    bucketName: "cp-pnp-bucket",
    dirName: userID,
    region: "us-east-1",
    accessKeyId: "AKIAX6GRSW2BGTRQ6CXK",
    secretAccessKey: "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",
  };


  useEffect(() => {
    const callGetProfile = async () => {
      let resp = await getUser(localStorage.getItem("accessToken"));
      if (resp) {
        setUserID(resp[0].id); 
      }
    };
    callGetProfile()
  }, []);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (file) => {
    uploadFile(file, config)
      .then((data) => props.setProfilePicURL(String(data.location)))
      .catch((err) => console.error(err));
    setSuccessMessage("Profile Picture Updated!")
    setShowSuccessToast(true);
  };

  const showID = () => {
    console.log(userID)
  }

  return (
    <div>
      {userID && showID()}
      <div>Upload Profile Pic</div>
      <input type="file" onChange={handleFileInput} />
      <Button
        variant="contained"
        size="small"
        onClick={() => handleUpload(selectedFile)}
      >
        Upload
      </Button>
      <SuccessToast
        open={showSuccessToast}
        setOpen={setShowSuccessToast}
        message={successMessage}
      />
    </div>
  );
};

export default S3Bucket;
