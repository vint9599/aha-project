import { Outlet } from "react-router-dom";
import Container from "./ContentContainer";
import Nav from "./Nav";

interface Props {
  children?: JSX.Element | JSX.Element[];
}

const BasicLayout = ({ children }: Props) => {
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
