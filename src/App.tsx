import { useRoutes, Route, Routes } from "react-router-dom";

import NavLayout from "./layout/NavLayout";
import FollowLayout from "./layout/FollowLayout";

import Search from "./pages/Search";
import Result from "./pages/Result";
import Tags from "./pages/Tag";

const App = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <FollowLayout />,
      children: [
        {
          index: true,
          element: <Search />,
        },
        {
          path: "results",
          element: <Result />,
        },
      ],
    },
    {
      element: <NavLayout />,
      children: [
        {
          path: "/tags",
          element: <Tags />,
        },
      ],
    },
  ]);

  return <div className="flex h-screen w-full overflow-hidden">{element}</div>;
};

export default App;
