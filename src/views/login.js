import React, { useMemo, useState } from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group'
import UsuarioService from '../app/service/usuarioService'
import LocalStorageService from '../app/service/localstorageService'
import { mensagemErro } from 'components/toastr';
import { USUARIO_LOGADO } from 'app/service/authService';

export default function Login() {

    const [usuario, setUsuario] = useState({
        email: '',
        senha: ''
    });  
    const service = useMemo(() => UserService(), []);    

    const entrar = () => {
        service.autenticar({
            email: usuario.email,
            senha: usuario.senha
        }).then( response => {
            LocalStorageService.adicionarItem( USUARIO_LOGADO, response.data );
            window.location.href="/home";
        }).catch( erro => {
            mensagemErro(erro.response.data);
        })
    }

    const cadastrar = () => {
        window.location.href="/cadastrar";
    }

    const handleUsuarioChange = (event) => {
         
        setUsuario(currentState => ({ ...currentState, [event.target.name]: event.target.value }));
    }
  
    return(
       <div className="container">
            <div className="row">
                <div className="col-md-6" style={ {position : 'relative', left : '300px'}}>
                    <Card title="Login">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <fieldset>
                                        <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                            <input type="email"
                                                   name="email"
                                                   value={usuario.email}
                                                   onChange={handleUsuarioChange} 
                                                   className="form-control" 
                                                   id="exampleInputEmail1" 
                                                   aria-describedby="emailHelp" 
                                                   placeholder="Digite o Email"/>
                                        </FormGroup>
                                        <p></p>
                                        <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                            <input type="password"
                                                   name="senha"
                                                   value={usuario.senha}
                                                   onChange={handleUsuarioChange}  
                                                   className="form-control" 
                                                   id="exampleInputPassword1" 
                                                   placeholder="Digite a Senha"/>
                                        </FormGroup>
                                        <p></p>
                                            <button onClick={entrar} className="btn btn-success">Entrar</button>                                            
                                            <button onClick={cadastrar} className="btn btn-danger">Cadastrar</button>
                                            
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
       </div>
    )
  }


function UserService() {
    return new UsuarioService();
}