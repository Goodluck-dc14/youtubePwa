import React, { useEffect, useState } from "react";
import styled from "styled-components";
import img from "./pic.jpg";
import image from "./3.jpg";
import vid from "./1.mp4";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import app from "../base";
import moment from "moment";
import { Link } from "react-router-dom";

const Home = () => {
  const [files, setFiles] = useState([]);

  const getData = async () => {
    await app
      .firestore()
      .collection("youtube")
      .onSnapshot((snapshot) => {
        const item = [];
        snapshot.forEach((doc) => {
          item.push({ ...doc.data(), id: doc.id });
        });
        setFiles(item);
        console.log(files);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      {files.map(
        ({
          id,
          video,
          title,
          description,
          avatar,
          image,
          name,
          number,
          time,
        }) => (
          <Wrapper key={id}>
            <Link to={`/Detail/${id}`}>
              <Media>
                <Image src={image} />
                <Video src={video} loop inputMode={true} autoPlay muted />
              </Media>
            </Link>

            <Content>
              <ProfilePix src={avatar} />
              <ProfileContent>
                <TitleHeader>
                  <Title>{title}</Title>
                  <Icon />
                </TitleHeader>
                <DescriptionContainer>
                  <Description>{name}</Description>
                  <DescriptionRow>
                    <Row>{number}</Row>
                    <Row>
                      <FiberManualRecordIcon />
                    </Row>
                    <Row>{moment(time.toDate()).fromNow()}</Row>
                  </DescriptionRow>
                </DescriptionContainer>
              </ProfileContent>
            </Content>
          </Wrapper>
        )
      )}
    </Container>
  );
};

export default Home;

const Container = styled.div`
  padding-top: 100px;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const Wrapper = styled.div``;

const Icon = styled(MoreVertIcon)`
  color: gray;
  &:hover {
    display: block;
    color: gray;
    opacity: 1;
  }
`;
const Content = styled.div`
  display: flex;
`;

const Media = styled.div`
  width: 350px;
  height: 200px;
  background-color: red;
  margin-bottom: 20px;
  position: relative;
  cursor: pointer;
`;
const Image = styled.img`
  width: 350px;
  height: 200px;
  object-fit: cover;
`;
const Video = styled.video`
  width: 350px;
  height: 200px;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: all 350ms;
  &:hover {
    opacity: 1;
  }
`;
const ProfilePix = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 25px;
  background-color: red;
  margin-right: 20px;
`;
const ProfileContent = styled.div``;
const TitleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 290px;
  align-items: center;
  margin-bottom: 20px;
`;
const DescriptionContainer = styled.div`
  font-weight: 500;
  color: gray;
`;
const Description = styled.div``;
const DescriptionRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  margin-top: 10px;
  align-items: center;
`;
const Row = styled.div`
  .MuiSvgIcon-root {
    font-size: 8px;
  }
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: bold;
  text-transform: capitalize;
`;
