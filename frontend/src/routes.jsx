import FormProduct from './pages/formProducts/FormProducts';
import FormUser from './pages/formUsers/FormUsers';
import FormExit from './pages/formExits/FormExits';
import FormEntry from './pages/formEntrys/FormEntrys';
import FormReports from './pages/formReports/FormReports';
import FormStock from './pages/formStock/FormStock';
import Login from './pages/login/Login';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";
const Rotas = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user" element={<PrivateRoute />}>
        <Route path="/user/estoque" element={<FormStock/>}/>
        <Route path="/user/cadastro" element={<FormProduct/>} />
        <Route path="/user/usuarios" element={<FormUser/>} />
        <Route path="/user/entradas" element={<FormEntry/>} />
        <Route path="/user/saidas" element={<FormExit/>} />
        <Route path="/user/relatorios" element={<FormReports/>} />
      </Route>
    </Routes>
  </Router>
);

export default Rotas;