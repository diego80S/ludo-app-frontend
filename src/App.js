import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ListaUsuarios } from './components/listaUsuarios';
import Registro from './components/registro';
import Login from './components/login';
import { Usuario } from './components/usuario';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registro" element={<Registro />} />
        <Route path="/" element={<Login />} />
        <Route path="/listaUsuarios" element={<ListaUsuarios />} />
        <Route path="/listaUsuarios/:id" element={<Usuario />} />
      </Routes>
    </Router>
  );

}

export default App;
