import { Outlet } from "react-router-dom";
import Container from "./ContentContainer";
import Nav from "./Nav";

const BasicLayout = () => {
  return (
    <>
      <Nav />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default BasicLayout;
