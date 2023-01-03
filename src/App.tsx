import React from "react";
import { Route, Routes } from "react-router-dom";

import Nav from "./layout/Nav";
import Container from "./layout/ContentContainer";
import Home from "./pages/Home";
import Tags from "./pages/Tag";
import Result from "./pages/Result";

interface PageRoute {
  path: string;
  displayFollow: boolean;
  pageContent: () => JSX.Element;
}

const App = () => {
  const route: PageRoute[] = React.useMemo(() => {
    return [
      {
        path: "/",
        displayFollow: true,
        pageContent: Home,
      },

      {
        path: "/tags",
        displayFollow: false,
        pageContent: Tags,
      },
      {
        path: "/results",
        displayFollow: false,
        pageContent: Result,
      },
    ];
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Nav />
      <Routes>
        {route.map((route, index) => {
          return (
            <React.Fragment key={index}>
              <Route
                path={route.path}
                element={
                  <Container displayFollow={route.displayFollow}>
                    {route.pageContent()}
                  </Container>
                }
              />
            </React.Fragment>
          );
        })}
      </Routes>
    </div>
  );
};

export default App;
