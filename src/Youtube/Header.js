import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import app from "../base";
import { Button } from "antd";
import { AuthContext } from "../TheComp/Global/AuthProvider";

const Header = () => {
  const { message } = useContext(AuthContext);

  return (
    <Container>
      <Wrapper>
        <div style={{ color: "white" }}>{message}</div>
        <Link to="/">
          <span>Home</span>
        </Link>

        <Link to="/MyPost">
          <span>Add</span>
        </Link>
        <Link to="/YouSign">
          <span>YouSign</span>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  background-color: black;
  height: 70px;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  font-size: 20px;
  align-items: center;
  justify-content: center;

  span {
    font-family: poppins;
    color: white;
    padding-left: 30px;
  }
`;
