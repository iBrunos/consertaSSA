import FormOrders from './pages/formOrders/FormOrders';
import FormUser from './pages/formUsers/FormUsers';
import Login from './pages/login/Login';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";
const Rotas = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user" element={<PrivateRoute />}>
        <Route path="/user/pedidos" element={<FormOrders/>} />
        <Route path="/user/usuarios" element={<FormUser/>} />
      </Route>
    </Routes>
  </Router>
);

export default Rotas;