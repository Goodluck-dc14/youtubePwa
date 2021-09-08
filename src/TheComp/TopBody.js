import { Button } from "antd/lib/radio";
import React from "react";
import styled from "styled-components";
import img from "./backg.png";

const TopBody = () => {
  return (
    <Container>
      <Title>Peter Oti</Title>
      <Wrapper>
        desktop.github.com took too long to respond. desktop.github.com took too
        long to respond. desktop.github.com took too long to respond.
        desktop.github.com took too long to respond. desktop.github.com took too
        long to respond. desktop.github.com took too long to respond.
      </Wrapper>
      <MyButton> Read More...</MyButton>
      <Text>
        <span>
          Download for <p>macOS </p> or <p>Windows (msi)</p>
        </span>

        <span>
          By downloading, you agree to the{" "}
          <p>Open Source Applications Terms.</p>
        </span>
      </Text>

      <BigImage src={img} />
    </Container>
  );
};

export default TopBody;

const BigImage = styled.img`
  margin-top: 50px;
  width: 800px;
  width: 900px;
  object-fit: cover;
`;

const Text = styled.div`
  width: 500px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;

  span {
    display: flex;
    margin: 0;

    p {
      margin: 0 5px;
      color: #896be7;
      cursor: pointer;
    }
  }
`;

const Container = styled.div`
  height: 130%;
  background-color: rgb(24, 24, 24);
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
  color: white;
  /* padding-bottom: 120px; */
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 60px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 800px;
`;

const MyButton = styled(Button)`
  margin-top: 50px;
  width: 300px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
  background-image: linear-gradient(#896be7, #583f8d);
  transition: all 350ms;
  transform: scale(1);
  outline: none;
  /* border: 0; */

  :hover {
    transform: scale(1.01);
    /* background-image: linear-gradient(#583f8d, #896be7); */
    color: white;
    box-shadow: rgb(0 0 0 / 29%) 0px 26px 30px -10px;
  }
`;
