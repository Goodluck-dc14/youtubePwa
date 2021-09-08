import React from "react";
import styled from "styled-components";

const LastComp = ({ img, text, sub }) => {
  return (
    <Container>
      <Wrapper>
        <Image src={img} />
        <Title>{text}</Title>
        <Sub>{sub}</Sub>
      </Wrapper>
    </Container>
  );
};

export default LastComp;
const Container = styled.div`
  background-color: rgb(24, 24, 24);
  width: 100%;
  color: white;
  justify-content: space-around;
  display: flex;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Image = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  background-color: #896be7;
  border-radius: 5px;
  padding: 10px;
`;
const Title = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 10px;
  width: 250px;
  justify-content: center;
  display: flex;
`;
const Sub = styled.div`
  margin-bottom: 20px;
  width: 250px;
  text-align: center;
`;
