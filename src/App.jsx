import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Feedback from "./pages/Feedback";
import {
  getUsers,
  userAutorize,
  addFeedback,
  getFeedbacks,
} from "./services/web-api.jsx"; // Importe a função getStudents do seu arquivo web_api.js
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  // {
  //   path: "/home",
  //   element: <Home />,
  // },
  {
    path: "/feedback",
    element: <Feedback />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const [searchText, setSearchText] = useState(""); // Estado para armazenar o texto de pesquisa
  const [result, setResult] = useState([]); // Estado para armazenar o resultado da pesquisa

  const handleListStudents = async () => {
    if (searchText === "") {
      // Se o campo de pesquisa estiver vazio, liste todos os estudantes
      const students = await getUsers();
      setResult(students);
    } else {
      // Se houver um texto no campo de pesquisa, liste apenas o estudante com o ID correspondente
      const student = await getUsers(searchText);
      setResult(student ? [student] : []);
    }
  };

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
