import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import CreateUserPage from "./pages/CreateUserPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import UserTasksPage from "./pages/UserTaskPage";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/users/new", element: <CreateUserPage /> },
  { path: "/tasks/new", element: <CreateTaskPage /> },
  { path: "/tasks/search", element: <UserTasksPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;