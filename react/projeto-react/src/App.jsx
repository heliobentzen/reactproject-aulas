import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import './App.css';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Login from './pages/Login';
import NotFound from "./pages/NotFound";
import Produtos from './pages/Products';
import UsuarioDetalhe from "./pages/UsuarioDetalhe";
import Usuarios from './pages/Usuarios';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Usuarios />} /> {/*rota index marca rota padrao*/}
        <Route path="/usuario/:id" element={<UsuarioDetalhe />} />

        <Route path="*" element={<NotFound />} />

        <Route element={<PrivateRoute />}>
          <Route path="/produtos" element={<Produtos />} />
        </Route>

      </Route>
    </>
  )
)

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App