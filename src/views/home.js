import React, { useEffect, useMemo, useState } from 'react';
import LocalStorageService from '../app/service/localstorageService'
import { USUARIO_LOGADO } from 'app/service/authService';
import UsuarioService from 'app/service/usuarioService';

export default function Home() {

    const [saldo, setSaldo] = useState(0);
    const service = useMemo(() => UserService(), []);
    
    useEffect(() => {
        const usuarioLogado = LocalStorageService.obterItem( USUARIO_LOGADO );

        service.obterSaldoPorUsuario(usuarioLogado.id)
               .then( response => {
                  setSaldo(response.data);
               }).catch( error => {
                  console.log( error.response );
               })
    });
    
    return (
        <div className="container">
            <div className="jumbotron">
              <h1 className="display-3">Bem vindo!</h1>
              <p className="lead">Esse é seu sistema de finanças.</p>
              <p className="lead">Seu saldo para o mês atual é de R$ {saldo}</p>
              <hr className="my-4"/>
              <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
              <p className="lead">
                <a className="btn btn-primary btn-lg" 
                   href="/cadastrar" 
                   role="button"><i className="fa fa-users"></i>  Cadastrar Usuário</a>
                <a className="btn btn-danger btn-lg" 
                   href="/cadastro-lancamento" 
                   role="button"><i className="fa fa-users"></i>  Cadastrar Lançamento</a>
              </p>
            </div>
        </div>
    )
    
}

function UserService() {
    return new UsuarioService();
}