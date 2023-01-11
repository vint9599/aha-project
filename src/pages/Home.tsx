import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("/search");
  }, []);

  return <></>;
};

export default Home;
