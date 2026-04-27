import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Coin from "./pages/Coin";
import Favorites from "./pages/Favorites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "coin/:id", element: <Coin /> },
      { path: "favorites", element: <Favorites /> },
    ],
  },
]);

export default router;
