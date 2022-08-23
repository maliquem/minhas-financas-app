import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/card';
import FormGroup from '../components/form-group';

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepetida: ''
    }

    salvar = () => {
        console.log(this.state)
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
                                            <button onClick={this.salvar} className="btn btn-success">Salvar</button>
                                            <Link to="/">
                                                <button className="btn btn-danger">Cancelar</button>
                                            </Link>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}

export default CadastroUsuario;