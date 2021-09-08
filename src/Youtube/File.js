import React, { useState, useEffect } from "react";
import styled from "styled-components";
import app from "../base";
import firebase from "firebase";

const File = () => {
  const [profilePics, setProfilePics] = useState("");
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState("");
  const [viewNumber, setViewNumber] = useState("");
  const [image, setImage] = useState("");
  const [profileName, setProfileName] = useState("");
  const [show, setShow] = useState(0);

  const getPost = async () => {
    await app.firestore().collection("youtube").doc().set({
      image: image,
      avatar: profilePics,
      title: title,
      name: profileName,
      video: video,
      description: viewNumber,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setProfilePics("");
    setTitle("");
    setViewNumber("");
    setImage("");
    setProfileName("");
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const fileRef = app.storage().ref();
    const storageRef = fileRef.child(file.name);
    await storageRef
      .put(file)
      .then(() => {
        console.log("completed");
      })
      .catch((err) => console.log(err.message));

    setImage(await storageRef.getDownloadURL());
  };

  const monitorProgressAvatar = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();

    const uploadTask = storageRef.child("avatar/" + file.name).put(file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setShow(progress);
        console.log("Upload for Avatar is " + progress + "% done");
      },

      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          setProfilePics(downloadURL);
        });
      }
    );
  };

  const monitorProgressImage = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();

    const uploadTask = storageRef.child("images/" + file.name).put(file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setShow(progress);
        console.log("Upload for Image is " + progress + "% done");
      },

      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };

  const monitorProgressVideo = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();

    const uploadTask = storageRef.child("video/" + file.name).put(file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setShow(progress);
        console.log("Upload for Video is " + progress + "% done");
      },

      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          setVideo(downloadURL);
        });
      }
    );
  };

  return (
    <Container>
      <Wrapper>
        {/* <p>
          {show === 0.0000001 || show === 100 ? <CircularProgress /> : null}
        </p> */}
        <h3>{`${Math.floor(show)}%`}</h3>
        <input
          placeholder="Enter your name"
          type="text"
          value={profileName}
          onChange={(e) => {
            setProfileName(e.target.value);
          }}
        />
        <input
          placeholder="Enter your profile title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          placeholder="Enter your Number"
          type="Number"
          value={viewNumber}
          onChange={(e) => {
            setViewNumber(e.target.value);
          }}
        />
        <InputHolder2>
          <input
            placeholder="enter a Video"
            type="file"
            onChange={monitorProgressVideo}
          />
          <input
            placeholder="choose a file or image"
            type="file"
            onChange={monitorProgressImage}
          />
          <input
            placeholder="choose a profilepics"
            type="file"
            onChange={monitorProgressAvatar}
          />
        </InputHolder2>
        <Button onClick={getPost}>Submit</Button>
      </Wrapper>
    </Container>
  );
};

export default File;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: lavender;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  input {
    outline: none;
    border: none;
    height: 80px;
    width: 500px;
    border-radius: 10px;
    margin-top: 10px;
    font-size: 20px;
    font-family: poppins;
    letter-spacing: 1.5px;
    padding-left: 10px;
  }
`;

const InputHolder2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.div`
  height: 50px;
  width: 150px;
  background-color: lightblue;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-family: poppins;
  font-size: 25px;
  cursor: pointer;
`;
