import firebase from "@firebase/app";
import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import app from "../base";
import { AiFillDelete, AiFillCreditCard } from "react-icons/ai";
import { IconBase } from "react-icons/lib";

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [myTask, setMyTask] = useState("");

  const onCreate = async () => {
    await app.firestore().collection("task").doc().set({
      title: myTask,
      done: false,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMyTask("");
  };

  const onUpdate = async (id) => {
    await app.firestore().collection("task").doc(id).update({
      done: true,
    });
    setMyTask("");
  };

  const onDelete = async (id) => {
    await app.firestore().collection("task").doc(id).delete();
  };

  const getData = async () => {
    await app
      .firestore()
      .collection("task")
      .orderBy("time", "asc")
      .onSnapshot((snapshot) => {
        const item = [];
        snapshot.forEach((doc) => {
          item.push({ ...doc.data(), id: doc.id });
        });
        setData(item);
        console.log(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Fragment>
      <Holder>
        <Input
          placeholder="Enter a task"
          value={myTask}
          onChange={(e) => {
            setMyTask(e.target.value);
          }}
        />
        <Button
          onClick={(e) => {
            onCreate();
          }}
        >
          Submit
        </Button>
      </Holder>
      <Container>
        {data?.map(({ title, id, done }) => (
          <Wrapper key={id}>
            {done ? (
              <Indicator brg>
                <Icon
                  onClick={() => {
                    onDelete(id);
                    console.log(id);
                  }}
                />
              </Indicator>
            ) : (
              <Indicator>
                <Icon
                  onClick={() => {
                    onDelete(id);
                    console.log(id);
                  }}
                />
              </Indicator>
            )}

            <Title>{title}</Title>

            <EditIcon>
              <Icon1
                onClick={() => {
                  onUpdate(id);
                  console.log(id);
                }}
              />
            </EditIcon>
          </Wrapper>
        ))}
      </Container>
    </Fragment>
  );
};

export default HomeScreen;

const Holder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lavender;
  padding-top: 50px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background-color: lavender;
  padding-top: 80px;
  height: 100vh;
  width: 100%;
  // flex-direction: column;
`;

const Wrapper = styled.div`
  background-color: white;
  height: 80px;
  width: 400px;
  box-shadow: rgba(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  display: flex;
  border-radius: 5px;
  // margin: 20px 0;
  margin-left: 20px;
`;

const Indicator = styled.div`
  min-height: 80px;
  background-color: ${({ brg }) => (brg ? "green" : "red")};
  width: 20%;
  border-radius: 5px 0 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled(AiFillDelete)`
  color: white;
  font-size: 30px;
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  padding-left: 30px;
  flex: 1;
`;

const Input = styled.input`
  height: 80px;
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: gray;
  font-family: poppins;
  margin-right: 30px;
  letter-spacing: 1.5px;
  border-radius: 5px;
  border: 1px solid lightblue;
  // border: none;
  outline: none;
`;

const Button = styled.div`
  height: 80px;
  width: 150px;
  background-color: white;
  border: 1px solid lightblue;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
  font-family: poppins;
`;

const EditIcon = styled.div`
  display: flex;
  align-items: center;
  padding-right: 20px;
`;

const Icon1 = styled(AiFillCreditCard)`
  font-size: 30px;
  color: green;
  cursor: pointer;
`;
