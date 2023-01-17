import { Outlet } from "react-router-dom";
import Container from "./ContentContainer";
import Nav from "./Nav";
import FollowPanel from "./FollowPanel";

const FollowLayout = () => {
  return (
    <div className="flex h-screen w-full">
      <Nav />
      <Container>
        <Outlet />
      </Container>
      <FollowPanel />
    </div>
  );
};

export default FollowLayout;
