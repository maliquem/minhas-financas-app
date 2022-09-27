import React from 'react';
import Login from '../views/login';
import Cadastro from '../views/cadastroUsuario';
import Consulta from '../views/lancamentos/consulta-lancamentos-hooks';
import CadastroLancamentos from 'views/lancamentos/cadastro-lancamentos';
import NotFound from '../views/notFound';
import PrimeBar from '../components/primeReactMenubar';
import Home from '../views/home';
import { Route, Routes } from 'react-router-dom';
import 'toastr/toastr.js'
import 'toastr/build/toastr.css'
import '../css/bootstrap.css'
import '../css/custom.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons                             

class App extends React.Component {
  render() {
    return (
      <>
      <PrimeBar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastro />} />
        <Route path="/consulta-lancamento" element={<Consulta />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro-lancamento" element={<CadastroLancamentos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </>
    )
  }
}

export default App;
  