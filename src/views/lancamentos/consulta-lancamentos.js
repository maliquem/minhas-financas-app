import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mensagemAlerta, mensagemErro, mensagemSucesso } from 'components/toastr';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import LancamentosTable from './lancamentosTable';


class ConsultaLancamentos extends React.Component {
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
                                           aria-describedby="emailHelp" 
                                           placeholder="Digite o Ano"/>
                                </FormGroup>
                                <FormGroup htmlFor="inputMes" label="Mês: ">
                                    <SelectMenu id="inputMes" className="form-control" lista={meses} />
                                </FormGroup>
                                <FormGroup htmlFor="inputTipo" label="Tipo de Lançamento: ">
                                    <SelectMenu id="inputTipo" className="form-control" lista={tipos} />
                                </FormGroup>
                                <button type="button" className="btn btn-success">Buscar</button>
                                <button type="button" className="btn btn-danger">Cadastrar</button>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="bs-component">
                                <LancamentosTable />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>    
        )
    }
}

export default (props) => (
    <ConsultaLancamentos history={useNavigate()} />
);