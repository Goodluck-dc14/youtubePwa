import React from "react";
import styled from "styled-components";

const MixChange = ({ img, text, sub, chg }) => {
  return (
    <Container>
      <Wrapper chg={chg}>
        <Image src={img} />
        <Text>
          <HeaderTag>{text}</HeaderTag>
          <Span>{sub}</Span>
        </Text>
      </Wrapper>
    </Container>
  );
};

export default MixChange;

const Container = styled.div`
  background-color: rgb(24, 24, 24);
  color: white;
  padding-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 900px;
  height: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: red; */
  flex-direction: ${({ chg }) => (chg ? "row" : "row-reverse")};
`;
const Image = styled.img`
  width: 400px;
  height: 250px;
  border-radius: 10px;
  margin-right: 40px;
`;
const Text = styled.div`
  width: 400px;
`;
const HeaderTag = styled.div`
  font-size: 20px;
  font-weight: 500;
`;
const Span = styled.div`
  margin-top: 10px;
`;
