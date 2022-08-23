import React from 'react';
import Login from '../views/login';
import Cadastro from '../views/cadastroUsuario';
import NotFound from '../views/notFound';
import Navbar from '../views/navBar';
import Home from '../views/home';
import 'bootswatch/dist/flatly/bootstrap.css';
import '../custom.css';
import { Route, Routes } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </>
    )
  }
}

export default App;
  