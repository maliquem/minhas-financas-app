import React, { useMemo, useState } from 'react';
import { mensagemAlerta, mensagemErro, mensagemSucesso } from 'components/toastr';
import UsuarioService from 'app/service/usuarioService';
import Card from '../components/card';
import FormGroup from '../components/form-group';

export default function CadastroUsuario() {

    const [cadastro, setCadastro] = useState({
        nome: '',
        email: '',
        senha: '',
        senhaRepetida: ''
    })
    const service = useMemo(() => UserService(), []);

    const cadastrar = () => {      
        const { nome, email, senha, senhaRepetida } = cadastro;   
        const usuario = { nome, email, senha, senhaRepetida };

        try {
            service.validar(usuario);
        } catch (erro) {           
            const mensagens = erro.msg;
            mensagens.forEach(msg => mensagemAlerta(msg));
            return false;
        }

        service.salvar(usuario)
            .then( response => {
            mensagemSucesso('Usuário cadastrado com sucesso!');
            window.location.href="/";
        }).catch( error => {
            mensagemErro(error.response.data);
        });
    }

    const cancelar = () => {
        window.location.href="/";
    }

    const handleCadastroChange = (event) => {
         
        setCadastro(currentState => ({ ...currentState, [event.target.name]: event.target.value }));
    }

    return (
        <div className="container">
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <fieldset>
                                    <FormGroup label="Nome: *" htmlFor="inputNome">
                                        <input type="text"
                                               value={cadastro.nome}
                                               onChange={handleCadastroChange} 
                                               className="form-control" 
                                               id="inputNome"
                                               name="nome" 
                                               aria-describedby="emailHelp" 
                                               placeholder="Digite o Nome"/>
                                    </FormGroup>
                                    <p></p>
                                    <FormGroup label="Email: *" htmlFor="inputEmail">
                                        <input type="email"
                                               value={cadastro.email}
                                               onChange={handleCadastroChange} 
                                               className="form-control" 
                                               id="inputEmail"
                                               name="email" 
                                               aria-describedby="emailHelp" 
                                               placeholder="Digite o Email"/>
                                    </FormGroup>
                                    <p></p>
                                    <FormGroup label="Senha: *" htmlFor="inputSenha">
                                        <input type="password"
                                               value={cadastro.senha}
                                               onChange={handleCadastroChange}  
                                               className="form-control" 
                                               id="inputSenha"
                                               name="senha" 
                                               placeholder="Digite a Senha"/>
                                    </FormGroup>
                                    <p></p>
                                    <FormGroup label="Repita a Senha: *" htmlFor="inputSenhaRepetida">
                                        <input type="password"
                                               value={cadastro.senhaRepetida}
                                               onChange={handleCadastroChange}  
                                               className="form-control" 
                                               id="inputSenhaRepetida"
                                               name="senhaRepetida" 
                                               placeholder="Digite a Senha Novamente"/>
                                    </FormGroup>
                                    <p></p>
                                        <button onClick={cadastrar} className="btn btn-success">Salvar</button>                                            
                                        <button onClick={cancelar} className="btn btn-danger">Cancelar</button>
                                        
                            </fieldset>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

function UserService() {
    return new UsuarioService();
}

