import React, { useMemo, useState } from 'react';
import { SelectButton } from 'primereact/selectbutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import Card from 'components/card';
import LancamentoService from 'app/service/lancamentoService';
import FormGroup from 'components/form-group';
import { InputText } from 'primereact/inputtext';
import { mensagemAlerta, mensagemErro, mensagemSucesso } from 'components/toastr';
import LocalStorageService from 'app/service/localstorageService';
import { Button } from 'primereact/button';
import { USUARIO_LOGADO } from 'app/service/authService';

export default function CadastroLancamentos() {

    const [cadastroLancamento, setCadastroLancamento] = useState({
        tipo: 'RECEITA',
        status: 'PENDENTE',
        valor: 0.00,
        mes: '',
        ano: 2022,
        descricao: ''
    })
    const service = useMemo(() => UserService(), []);
    const [listaMeses] = useState(service.obterListaMeses);
    const [listaTipos] = useState(service.obterListaTipos);
    const [listaStatus] = useState(service.obterListaStatus);
    const [usuarioLogado] = useState(LocalStorageService.obterItem( USUARIO_LOGADO ));

    const cadastrar = () => {        
        const { tipo, status, valor, mes, ano, descricao } = cadastroLancamento; 
        const lancamento = {
            tipo, status, valor, mes, ano, descricao,
            usuario: usuarioLogado.id
        }

        try {
            service.validar(lancamento);
        } catch (erro) {           
            const mensagens = erro.msg;
            mensagens.forEach(msg => mensagemAlerta(msg));
            return false;
        }

        service.salvar(lancamento)
            .then( response => {
            mensagemSucesso('Lançamento cadastrado com sucesso!');
            setCadastroLancamento({tipo: 'RECEITA',
                           status: 'PENDENTE',
                           valor: 0.00,
                           mes: '',
                           ano: 2022,
                           descricao: ''})            
        }).catch( error => {
            mensagemErro(error.response.data);
        });
    }

    const handleCadastroLancamentoChange = (event) => {
        setCadastroLancamento(currentState => ({ ...currentState, [event.target.name]: event.target.value }));
    }

    return(
        <div className="container">
            <Card title="Cadastro Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="cadastroTipo" label="Tipo: *">                                    
                                <SelectButton id="cadastroTipo"
                                              value={cadastroLancamento.tipo} 
                                              options={listaTipos}
                                              name="tipo" 
                                              onChange={handleCadastroLancamentoChange} />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="bs-component">
                            <div className="grid p-fluid">
                                <FormGroup htmlFor="cadastroStatus" label="Status: ">                                    
                                <SelectButton id="cadastroStatus"
                                              value={cadastroLancamento.status} 
                                              options={listaStatus}
                                              name="status" 
                                              onChange={handleCadastroLancamentoChange} />
                            </FormGroup>
                            </div>
                        </div>
                    </div>
                </div>              
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <div className="grid p-fluid">
                               <FormGroup htmlFor="cadastroDescricao" label="Descrição: *">
                                    <InputText id="inputDescricao"
                                               value={cadastroLancamento.descricao}
                                               name="descricao"
                                               onChange={handleCadastroLancamentoChange}                                         
                                               placeholder="Digite o Descrição"/>
                               </FormGroup>                                                            
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="bs-component">
                            <div className="grid p-fluid">
                                <FormGroup htmlFor="cadastroValor" label="Valor: *">
                                    <InputNumber id="cadastroValor"
                                                 inputId="currency-br" 
                                                 value={cadastroLancamento.valor}
                                                 name="valor" 
                                                 onValueChange={handleCadastroLancamentoChange} 
                                                 mode="currency" 
                                                 currency="BRL" 
                                                 locale="pt-BR"
                                                 placeholder="R$ 0,00" />
                                </FormGroup>           
                                                        
                            </div>
                        </div>
                    </div>
                </div>                    
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <div className="grid p-fluid">
                                <FormGroup htmlFor="cadastroMes" label="Mês: *">
                                    <Dropdown id="cadastroMes"
                                              value={cadastroLancamento.mes} 
                                              options={listaMeses}
                                              name="mes" 
                                              onChange={handleCadastroLancamentoChange} 
                                              optionLabel="label" 
                                              placeholder="Selecione o mês..." />                                                            
                                </FormGroup>            
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="bs-component">
                            <div className="grid p-fluid">
                                <FormGroup htmlFor="cadastroAno" label="Ano: *">
                                    <InputNumber id="cadastroAno"
                                                 inputId="minmax-buttons" 
                                                 value={cadastroLancamento.ano}
                                                 name="ano" 
                                                 onValueChange={handleCadastroLancamentoChange} 
                                                 mode="decimal"
                                                 format={false} 
                                                 showButtons min={2020} max={2030} />                                                          
                                </FormGroup>            
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-3">
                        <div className="bs-component">
                            <div className="grid p-fluid">
                                <Button onClick={cadastrar} 
                                        icon="pi pi-plus" 
                                        label="Cadastrar" 
                                        className="p-button-raised p-button-success" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="bs-component">
                            <div className="grid p-fluid">
                                <Button onClick={() => { window.location.href="/consulta-lancamento"; }} 
                                        icon="pi pi-search" 
                                        label="Consultar" 
                                        className="p-button-raised" />
                            </div>
                        </div>
                    </div>
                </div>                                        
            </Card>
        </div>
    )
}

function UserService() {
    return new LancamentoService();
}