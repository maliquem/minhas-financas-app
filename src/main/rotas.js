import React from 'react';
import Login from '../views/login';
import Cadastro from '../views/cadastroUsuario';
import Consulta from '../views/lancamentos/consulta-lancamentos';
import CadastroLancamentos from 'views/lancamentos/cadastro-lancamentos';
import NotFound from '../views/notFound';
import Home from '../views/home';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AuthService from 'app/service/authService';

function RotaAutenticada( { isUsuarioAutenticado, children } ){
    const location = useLocation();

    if (isUsuarioAutenticado) {
        return children       
    } 
    
    return <Navigate to="/" replace state={{ path: location.pathname }} />        
    
}

export default function Rotas(){
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cadastrar" element={<Cadastro />} />

            <Route path="/home" element={
            <RotaAutenticada isUsuarioAutenticado={AuthService.isUsuarioAutenticado()}>
                <Home />
            </RotaAutenticada>} />

            <Route path="/consulta-lancamento" element={
            <RotaAutenticada isUsuarioAutenticado={AuthService.isUsuarioAutenticado()}>
                <Consulta />
            </RotaAutenticada>} />

            <Route path="/cadastro-lancamento" element={
            <RotaAutenticada isUsuarioAutenticado={AuthService.isUsuarioAutenticado()}>
                <CadastroLancamentos />
            </RotaAutenticada>} />
        </Routes>
    )
}