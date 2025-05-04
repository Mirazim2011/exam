import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import Quiz from "./pages/Quiz/Quiz";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "quiz",
          element: <Quiz />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
