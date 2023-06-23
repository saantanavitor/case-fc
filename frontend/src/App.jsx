import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/login/login";
import { Home } from "./pages/home/home";
import { RequireAuth } from "react-auth-kit";
import { NovoUsuario } from "./pages/novoUsuario/novoUsuario";
import { EditarUsuario } from "./pages/editarUsuario/editarUsuario";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth loginPath="/login">
            <Home />
          </RequireAuth>
        }
      >
      </Route>
      <Route path="/novousuario" element={<NovoUsuario />} />
      <Route path="/editarusuario/:id" element={<EditarUsuario />} />
      <Route path="/login" element={<Login />}>
      </Route>
    </Routes>
  );
}

export default App;
