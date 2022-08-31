import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mensagemErro, mensagemAlerta, mensagemSucesso } from 'components/toastr';
import { ConfirmDialog } from 'primereact/confirmdialog';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import LancamentosTable from './lancamentosTable';
import LancamentoService from 'app/service/lancamentoService';
import LocalStorageService from 'app/service/localstorageService';


class ConsultaLancamentos extends React.Component {

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    state = {
        ano: '',
        descricao: '',
        mes: '',
        tipo: '',
        status: '',
        visible: false,
        lancamentoDeletar: {},
        lancamentos: []
    }

    editar = (id) => {

    }

    rejeitar = () => {
        mensagemAlerta('Lançamento não foi deletado.');
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({ visible: true, lancamentoDeletar: lancamento });
    }

    deletar = () => {
        this.service.deletar(this.state.lancamentoDeletar.id)
                    .then( response => {
                        const lancamentos = this.state.lancamentos;
                        const index = lancamentos.indexOf(this.state.lancamentoDeletar);
                        lancamentos.splice(index, 1);
                        this.setState({lancamentos: lancamentos});
                        mensagemSucesso('Lançamento deletado com sucesso.');
                    }).catch( error => {
                        mensagemErro(error.response.data);
                    })
    }

    buscar = () => {
        if (!this.state.ano) {
            mensagemAlerta('Campo Ano é obrigatório.');
            return false;
        }

        const usuarioLogado = LocalStorageService.obterItem( '_usuario_logado' );

        const lancamentoFiltro = {
            ano: this.state.ano,
            descricao: this.state.descricao,
            mes: this.state.mes,
            tipo: this.state.tipo,
            status: this.state.status,
            usuario: usuarioLogado.id
        }

        this.service.consultar(lancamentoFiltro)
                    .then( response => {
                        this.setState({ lancamentos: response.data });
                    }).catch( error => {
                        mensagemErro(error.response.data);
                    });
    }

    render() {

        const meses = this.service.obterListaMeses();

        const tipos = this.service.obterListaTipos();

        const status = this.service.obterListaStatus();

        return (
            <div className="container">
                <Card title="Consulta Lançamentos">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="bs-component">
                                <FormGroup htmlFor="inputAno" label="Ano: *">
                                    <input type="text" 
                                           className="form-control" 
                                           id="inputAno"
                                           value={this.state.ano}
                                           onChange={e => this.setState({ ano: e.target.value })}                                         
                                           placeholder="Digite o Ano"/>
                                </FormGroup>
                                <FormGroup htmlFor="inputDescricao" label="Descrição: ">
                                    <input type="text" 
                                           className="form-control" 
                                           id="inputDescricao"
                                           value={this.state.descricao}
                                           onChange={e => this.setState({ descricao: e.target.value })}                                         
                                           placeholder="Digite o Descrição"/>
                                </FormGroup>
                                <FormGroup htmlFor="inputMes" label="Mês: ">
                                    <SelectMenu id="inputMes"
                                                value={this.state.mes}
                                                onChange={e => this.setState({ mes: e.target.value })} 
                                                className="form-control" 
                                                lista={meses} />
                                </FormGroup>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="bs-component">
                                <FormGroup htmlFor="inputTipo" label="Tipo de Lançamento: ">
                                    <SelectMenu id="inputTipo"
                                                value={this.state.tipo}
                                                onChange={e => this.setState({ tipo: e.target.value })} 
                                                className="form-control" 
                                                lista={tipos} />
                                </FormGroup>
                                <FormGroup htmlFor="inputStatus" label="Status: ">
                                    <SelectMenu id="inputStatus"
                                                value={this.state.status}
                                                onChange={e => this.setState({ status: e.target.value })} 
                                                className="form-control" 
                                                lista={status} />
                                </FormGroup>
                                <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
                                <button type="button" className="btn btn-danger">Cadastrar</button>
                            </div>                                
                        </div>
                    </div>
                    <br/>                    
                </Card>
                <div className="row">
                    <div className="col-md-12">
                        <div className="page-header">
                            <h1 id="tables"></h1>
                        </div>
                        <div className="bs-component">
                            <ConfirmDialog visible={this.state.visible} 
                                           onHide={() => this.setState({ visible: false })} 
                                           message="Tem certeza que deseja deletar esse lançamento?"
                                           header="Confirmation" 
                                           icon="pi pi-exclamation-triangle" 
                                           accept={this.deletar} 
                                           reject={this.rejeitar}/>
                            <LancamentosTable lancamentos={this.state.lancamentos} 
                                              deleteAction={this.abrirConfirmacao} 
                                              editarAction={this.editar} />
                        </div>
                    </div>
                </div>
            </div>    
        )
    }
}

export default (props) => (
    <ConsultaLancamentos history={useNavigate()} />
);