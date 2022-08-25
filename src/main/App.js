import React from 'react';
import Login from '../views/login';
import Cadastro from '../views/cadastroUsuario';
import Consulta from '../views/lancamentos/consulta-lancamentos';
import NotFound from '../views/notFound';
import Navbar from '../components/navBar';
import Home from '../views/home';
import { Route, Routes } from 'react-router-dom';
import 'toastr/toastr.js'
import 'toastr/build/toastr.css'
import '../bootstrap.css'
import '../custom.css';

class App extends React.Component {
  render() {
    return (
      <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastro />} />
        <Route path="/consulta-lancamento" element={<Consulta />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </>
    )
  }
}

export default App;
  