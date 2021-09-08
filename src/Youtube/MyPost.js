import React, { useState, useEffect } from "react";
import styled from "styled-components";
import app from "../base";
import firebase from "firebase";
import CircularProgress from "@material-ui/core/CircularProgress";

const MyPost = () => {
  const [profilePics, setProfilePics] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [title, setTitle] = useState("");
  const [profileName, setProfileName] = useState("");
  const [viewNumber, setViewNumber] = useState("");
  const [desc, setDesc] = useState("");

  const [showP, setShowP] = useState(0);
  const [showV, setShowV] = useState(0);
  const [showI, setShowI] = useState(0);

  const Post = async () => {
    await app.firestore().collection("youtube").doc().set({
      video: video,
      avatar: profilePics,
      title: title,
      name: profileName,
      image: image,
      number: viewNumber,
      description: desc,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setProfilePics("");
    setTitle("");
    setViewNumber("");
    setImage("");
    setProfileName("");
    setVideo("");
    setDesc("");
  };

  const uploadProfilePics = async ({ target }) => {
    const file = target.files[0];
    const fileRef = await app.storage().ref();
    const storageRef = fileRef.child("Profile/" + file.name).put(file);

    storageRef.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const uploadByte =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`${Math.round(uploadByte)} %`);
        setShowP(Math.round(uploadByte));
      },
      (err) => {
        console.log(err.msg);
      },
      () => {
        storageRef.snapshot.ref.getDownloadURL().then((URL) => {
          console.log(URL);
          setProfilePics(URL);
        });
      }
    );
  };

  const uploadImage = async ({ target }) => {
    const file = target.files[0];
    const fileRef = await app.storage().ref();
    const storageRef = fileRef.child("Image/" + file.name).put(file);

    storageRef.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const uploadByte =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`${Math.round(uploadByte)} %`);
        setShowI(Math.round(uploadByte));
      },
      (err) => {
        console.log(err.msg);
      },
      () => {
        storageRef.snapshot.ref.getDownloadURL().then((URL) => {
          console.log(URL);
          setImage(URL);
        });
      }
    );
  };

  const uploadVideo = async ({ target }) => {
    const file = target.files[0];
    const fileRef = await app.storage().ref();
    const storageRef = fileRef.child("Video/" + file.name).put(file);

    storageRef.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const uploadByte =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`${Math.round(uploadByte)} %`);
        setShowV(Math.round(uploadByte));
      },
      (err) => {
        console.log(err.msg);
      },
      () => {
        storageRef.snapshot.ref.getDownloadURL().then((URL) => {
          console.log(URL);
          setVideo(URL);
        });
      }
    );
  };

  return (
    <Container>
      <Wrapper>
        <FileHolder>
          <p> {showP === 0 || showP === 100 ? null : <CircularProgress />}</p>
          <input
            placeholder="choose a profile"
            type="file"
            onChange={uploadProfilePics}
          />
          <input
            placeholder="choose an image"
            type="file"
            onChange={uploadImage}
          />
          <input
            placeholder="choose a video"
            type="file"
            onChange={uploadVideo}
          />
        </FileHolder>
        <input
          placeholder="Enter your name"
          type="text"
          value={profileName}
          onChange={(e) => {
            setProfileName(e.target.value);
          }}
        />
        <Holder>
          <input
            placeholder="Enter description"
            type="text"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        </Holder>
        <input
          placeholder="Put a title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          placeholder="Enter your viewNumber"
          type="text"
          value={viewNumber}
          onChange={(e) => {
            setViewNumber(e.target.value);
          }}
        />

        <Button onClick={Post}>Add</Button>
      </Wrapper>
    </Container>
  );
};

export default MyPost;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
  justify-content: center;
  align-items: center;
  background-color: lavender;
  height: 100vh;
  width: 100vw;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  input {
    height: 30px;
    width: 500px;
    background-color: transparent;
    margin-top: 20px;
    border-none;
    outline: none;
  }
`;

const Button = styled.div`
  height: 30px;
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: orange;
  margin-top: 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const Holder = styled.div`
  input {
    height: 60px;
    width: 500px;
  }
`;

const FileHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  input {
    height: 50px;
    width: 500px;
    background-color: transparent;
    border: 1px solid black;
    margin-top: 20px;
    padding-top: 10px;
    padding-left: 10px;
  }
  p {
  }
`;
