import React from "react";
import Nav from "./layout/Nav";
import Container from "./layout/ContentContainer";
import Home from "./pages/Home";
import Tags from "./pages/Tag";

import { Route, Routes } from "react-router-dom";

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
