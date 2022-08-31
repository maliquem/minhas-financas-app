import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mensagemErro } from 'components/toastr';
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
        lancamentos: []
    }

    buscar = () => {
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
                        this.setState({ lancamentos: response.data })
                    }).catch( error => {
                        mensagemErro(error.response.data);
                    });
    }

    render() {

        const meses = [
            { label: 'JANEIRO', value: 1 },
            { label: 'FEVEREIRO', value: 2 },
            { label: 'MARÇO', value: 3 },
            { label: 'ABRIL', value: 4 },
            { label: 'MAIO', value: 5 },
            { label: 'JUNHO', value: 6 },
            { label: 'JULHO', value: 7 },
            { label: 'AGOSTO', value: 8 },
            { label: 'SETEMBRO', value: 9 },
            { label: 'OUTUBRO', value: 10 },
            { label: 'NOVEMBRO', value: 11 },
            { label: 'DEZEMBRO', value: 12 }
        ]

        const tipos = [
            { label: 'DESPESA', value: 'DESPESA' },
            { label: 'RECEITA', value: 'RECEITA' }
        ]

        const status = [
            { label: 'PENDENTE', value: 'PENDENTE'},
            { label: 'CANCELADO', value: 'CANCELADO'},
            { label: 'EFETIVADO', value: 'EFETIVADO'}
        ]

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
                            <LancamentosTable lancamentos={this.state.lancamentos} />
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