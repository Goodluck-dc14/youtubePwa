import { Button, Input } from "antd";
import React, { useState, useContext } from "react";
import styled from "styled-components";
import app from "../base";
import firebase from "firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { AuthContext } from "../TheComp/Global/AuthProvider";

const YouSign = () => {
  const { currentUser } = useContext(AuthContext);

  const [readImage, setReadImage] = useState("");
  const [percent, setPercent] = useState(0.00000000001);

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);

  const onToggle = () => {
    setShow(!show);
    console.log(show);
  };

  const signUp = async () => {
    await app.auth().createUserWithEmailAndPassword(email, password);
  };

  const signUpWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await app.auth().signInWithPopup(provider);
  };

  const signUpWithGitHub = async () => {
    const provider = new firebase.auth.GitHubAuthProvider();
    await app.auth().signInWithPopup(provider);
  };

  const signUpWithFacebook = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    await app.auth().signInWithPopup(provider);
  };

  const getMyImage = async ({ target }) => {
    const file = target.files[0];
    const myImage = URL.createObjectURL(file);
    console.log("I can see you: ", myImage);
    setReadImage(myImage);
  };

  const pushToBackEnd = async ({ target }) => {
    const file = target.files[0];
    const myImage = URL.createObjectURL(file);
    console.log("I can see you: ", myImage);
    setReadImage(myImage);

    const fileRef = await app.storage().ref();
    const storageRef = fileRef.child("avatar/" + file.name).put(file);

    storageRef.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const counter = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercent(counter);
        console.log(counter);
      },
      (err) => {
        console.log(err.message);
      },
      () => {
        storageRef.snapshot.ref.getDownloadURL().then((URL) => {
          console.log("This is the URL: ", URL);
        });
      }
    );
  };

  return (
    <Container>
      <Wrapper>
        <Inputs>
          <AvatarInput type="file" onChange={pushToBackEnd} />
          <MyInput
            type="text"
            placeholder="Enter Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
          <MyInput
            type="text"
            placeholder="Enter UserName"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            value={userName}
          />
          <MyInput
            type="text"
            placeholder="Enter Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <PasswordContainer>
            <PasswordInput
              type={show ? "password" : null}
              // type="password"
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />

            {show ? (
              <VisibilityOff onClick={onToggle} />
            ) : (
              <Visibility onClick={onToggle} />
            )}
          </PasswordContainer>
          <Button danger type="primary" onClick={signUp}>
            Submit
          </Button>
          <div>
            <p>Or sign up with </p>
            <span onClick={signUpWithGoogle}>Google</span>,
            <span onClick={signUpWithGitHub}>Google</span>,
            <span onClick={signUpWithFacebook}>Facebook</span> or
            <span onClick={signUpWithGoogle}> phone</span>
          </div>
        </Inputs>
        <Display>
          {percent === 0.00000000001 || percent === 100 ? null : (
            <DivContainer>
              {" "}
              <p>{Math.round(percent)}%</p>
              <Icon />
              <Cover />{" "}
            </DivContainer>
          )}
          <Image src={readImage} />
        </Display>
      </Wrapper>
    </Container>
  );
};

export default YouSign;

const PasswordContainer = styled.div`
  display: flex;
  align-items: center;
  width: 350px;
  height: 40px;
  margin: 10px 0;
  border: 1px solid lightgray;
  border-radius: 2px;
  padding: 0 10px;
  &:hover {
    border: 1px solid aquamarine;
  }
  .MuiSvgIcon-root {
    cursor: pointer;
  }
`;

const PasswordInput = styled.input`
  width: 350px;
  height: 40px;
  margin: 10px 0;
  border: 0;
  outline: none;
  background-color: transparent;
  ::placeholder {
    color: silver;
  }
`;

const Icon = styled(CircularProgress)`
  position: absolute;
`;

const DivContainer = styled.div`
  width: 500px;
  height: 300px;
  border-radius: 10px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Cover = styled.div`
  width: 500px;
  height: 300px;
  border-radius: 10px;
  background-color: white;
  position: absolute;
  opacity: 0.4;
`;

const Container = styled.div`
  padding-top: 80px;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const Wrapper = styled.div`
  width: 750px;
  /* justify-content: space-between; */
  display: flex;
  align-items: center;
`;
const Inputs = styled.div`
  width: 500px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    justify-content: center;
  }
  span {
    margin-left: 5px;
    font-weight: bold;
    cursor: pointer;
    color: blue;
  }
`;
const AvatarInput = styled(Input)`
  width: 100%;
  margin: 10px 0;
`;
const MyInput = styled(Input)`
  width: 350px;
  height: 40px;
  margin: 10px 0;
`;

const Display = styled.div`
  width: 500px;
  height: 300px;
  border-radius: 10px;
  margin-left: 40px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    position: absolute;
    margin-top: 10px;
    font-weight: bold;
  }
`;
const Image = styled.img`
  width: 500px;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: rgb(0 0 0/69%) 0px 10px 10px -10px;
`;
