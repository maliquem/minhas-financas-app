import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mensagemAlerta, mensagemErro, mensagemSucesso } from 'components/toastr';
import UsuarioService from 'app/service/usuarioService';
import Card from '../components/card';
import FormGroup from '../components/form-group';

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepetida: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    cadastrar = () => {      
        const { nome, email, senha} = this.state;   
        const usuario = { nome, email, senha };

        try {
            this.service.validar(usuario);
        } catch (erro) {           
            const mensagens = erro.msg;
            mensagens.forEach(msg => mensagemAlerta(msg));
            return false;
        }

        this.service.salvar(usuario)
            .then( response => {
            mensagemSucesso('Usuário cadastrado com sucesso!');
            this.props.history('/');
        }).catch( error => {
            mensagemErro(error.response.data);
        });
    }

    cancelar = () => {
        this.props.history('/');
    }


    render() {
        return (
            <div className="container">
                <Card title="Cadastro de Usuário">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <fieldset>
                                        <FormGroup label="Nome: *" htmlFor="inputNome">
                                            <input type="text"
                                                   value={this.state.nome}
                                                   onChange={e => this.setState({ nome: e.target.value })} 
                                                   className="form-control" 
                                                   id="inputNome"
                                                   name="nome" 
                                                   aria-describedby="emailHelp" 
                                                   placeholder="Digite o Nome"/>
                                        </FormGroup>
                                        <p></p>
                                        <FormGroup label="Email: *" htmlFor="inputEmail">
                                            <input type="email"
                                                   value={this.state.email}
                                                   onChange={e => this.setState({ email: e.target.value })} 
                                                   className="form-control" 
                                                   id="inputEmail"
                                                   name="email" 
                                                   aria-describedby="emailHelp" 
                                                   placeholder="Digite o Email"/>
                                        </FormGroup>
                                        <p></p>
                                        <FormGroup label="Senha: *" htmlFor="inputSenha">
                                            <input type="password"
                                                   value={this.state.senha}
                                                   onChange={e => this.setState({ senha: e.target.value })}  
                                                   className="form-control" 
                                                   id="inputSenha"
                                                   name="senha" 
                                                   placeholder="Digite a Senha"/>
                                        </FormGroup>
                                        <p></p>
                                        <FormGroup label="Repita a Senha: *" htmlFor="inputSenhaRepetida">
                                            <input type="password"
                                                   value={this.state.senhaRepetida}
                                                   onChange={e => this.setState({ senhaRepetida: e.target.value })}  
                                                   className="form-control" 
                                                   id="inputSenhaRepetida"
                                                   name="senhaRepetida" 
                                                   placeholder="Digite a Senha Novamente"/>
                                        </FormGroup>
                                        <p></p>
                                            <button onClick={this.cadastrar} className="btn btn-success">Salvar</button>                                            
                                            <button onClick={this.cancelar} className="btn btn-danger">Cancelar</button>
                                            
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}


// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <CadastroUsuario history={useNavigate()} />
);