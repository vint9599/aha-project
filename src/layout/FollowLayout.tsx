import { Outlet } from "react-router-dom";
import Container from "./ContentContainer";
import Nav from "./Nav";
import Follow from "./Follow";

const FollowLayout = () => {
  return (
    <>
      <Nav />
      <Container>
        <Outlet />
      </Container>
      <Follow />
    </>
  );
};

export default FollowLayout;
