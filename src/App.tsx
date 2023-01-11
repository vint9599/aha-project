import { useRoutes } from "react-router-dom";

import NavLayout from "./layout/NavLayout";
import FollowLayout from "./layout/FollowLayout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Result from "./pages/Result";
import Tags from "./pages/Tag";

const App = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <NavLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },

    {
      path: "/search",
      element: <FollowLayout />,
      children: [
        {
          index: true,
          element: <Search />,
        },
        {
          path: "result",
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
