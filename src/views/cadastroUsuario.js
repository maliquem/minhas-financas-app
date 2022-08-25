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

    validar(){
        const msgs = [];

        if ( !this.state.nome ){
            msgs.push('O campo Nome é obrigatorio.');
        }

        if ( !this.state.email ){
            msgs.push('O campo Email é obrigatorio.');
        } else if ( !this.state.email.match( /[a-z0-9]+@[a-z0-9]+.[a-z0-9]{2,3}.?[a-z0-9]{2,3}/ ) ){
            msgs.push('Informe um Email válido.');
        }

        if ( !this.state.senha || !this.state.senhaRepetida ){
            msgs.push( 'O campo Senha é obrigatorio.' );
        } else if ( this.state.senha !== this.state.senhaRepetida ){
            msgs.push( 'As senhas não são iguais.' )
        }

        return msgs;
    }

    cadastrar = () => {
        const msgs = this.validar();

        if ( msgs.length > 0 ) {
            msgs.forEach ( ( msg ) => {
                mensagemAlerta( msg );
            })
            return false;
        }

        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
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

export default (props) => (
  <CadastroUsuario history={useNavigate()} />
);