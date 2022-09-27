import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mensagemErro, mensagemAlerta, mensagemSucesso } from 'components/toastr';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import LancamentosTable from './lancamentosTable';
import LancamentoService from 'app/service/lancamentoService';
import LocalStorageService from 'app/service/localstorageService';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { SelectButton } from 'primereact/selectbutton';

class ConsultaLancamentos extends React.Component {

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    state = {
        ano: 2022,
        descricao: '',
        mes: '',
        tipo: '',
        valor: 0.00,
        status: '',
        visibleConfirm: false,
        visibleDialog: false,
        lancamentoTemporario: {},        
        lancamentos: []
    }    

    abrirDialogoEditar = (id) => {
        this.service.consultarPorId(id).then( response => {
            const lancamentoFiltro = response.data;
            this.setState( currentState => ({ ...currentState,                                            
                                            lancamentoTemporario: lancamentoFiltro,
                                            visibleDialog: true }));
        }).catch( error => {
            mensagemErro(error.response.data);
        })
    }

    rejeitar = () => {
        this.setState( currentState => ({ ...currentState, lancamentoTemporario: {} }));
    }

    abrirConfirmacao = (lancamento) => {
        this.setState( currentState => ({ ...currentState, visibleConfirm: true, lancamentoTemporario: lancamento }));
    }

    deletar = () => {
        this.service.deletar(this.state.lancamentoTemporario.id)
                    .then( response => {
                        const lancamentos = this.state.lancamentos;
                        const index = lancamentos.indexOf(this.state.lancamentoTemporario);
                        lancamentos.splice(index, 1);
                        this.setState( currentState => ({ ...currentState, lancamentos: lancamentos}));
                        mensagemSucesso('Lançamento deletado com sucesso.');
                    }).catch( error => {
                        mensagemErro(error.response.data);
                    })
    }

    atualizar = () => {        
        const usuarioLogado = LocalStorageService.obterItem( '_usuario_logado' );
        const { id, tipo, status, valor, mes, ano, descricao } = this.state.lancamentoTemporario;  
        const lancamento = {
            id, tipo, status, valor, mes, ano, descricao,
            usuario: usuarioLogado.id
        }

        try {
            this.service.validar(lancamento);
        } catch (erro) {           
            const mensagens = erro.msg;
            mensagens.forEach(msg => mensagemAlerta(msg));
            return false;
        }

        this.service.atualizar(lancamento)
            .then( response => {
            this.setState( currentState => ({ ...currentState, visibleDialog: false }));          
            this.buscar();            
            mensagemSucesso('Lançamento atualizado com sucesso!');            
        }).catch( error => {
            mensagemErro(error.response.data);
        });
    }   

    buscar = () => {
        if (!this.state.ano) {
            mensagemAlerta('Campo Ano é obrigatório.');
            return false;
        }

        const usuarioLogado = LocalStorageService.obterItem( '_usuario_logado' );
        const { ano, descricao, mes, tipo, status } = this.state;

        const lancamentoFiltro = {
            ano, descricao, mes, tipo, status,
            usuario: usuarioLogado.id
        }

        this.service.consultar(lancamentoFiltro)
                    .then( response => {
                        const lista = response.data;
                        if (lista.length < 1) {
                            mensagemAlerta('Nenhum Lançamento encontrado.');
                        }
                        this.setState( currentState => ({ ...currentState, lancamentos: lista }));
                    }).catch( error => {
                        mensagemErro(error.response.data);
                    });       
                    
    }

    handleChange = (event) => {
         
        this.setState( currentState => ({ 
            ...currentState, 
            [event.target.name]: event.target.value}));
    }

    onLancamentoTemporarioChange = (event) => {
    this.setState( currentState => ({ 
       ...currentState,
       lancamentoTemporario: {
            ...currentState.lancamentoTemporario,
            [event.target.name]: event.target.value}}));
}

    render() {

        const meses = this.service.obterListaMeses();

        const tipos = this.service.obterListaTipos();

        const status = this.service.obterListaStatus();        

        const footer = (
            <div>
                <Button label="Salvar" 
                        icon="pi pi-check" 
                        onClick={this.atualizar} />
                <Button label="Cancelar" 
                        icon="pi pi-times" 
                        onClick={(e) => this.setState( currentState => ({ ...currentState, visibleDialog: false }))} />
            </div>
        );        

        return (
            <div className="container">
                <Card title="Consulta Lançamentos">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="bs-component">
                                <div className="grid p-fluid">                                    
                                    <FormGroup htmlFor="inputAno" label="Ano: *">
                                        <InputNumber id="inputAno"
                                                     inputId="minmax-buttons" 
                                                     value={this.state.ano}
                                                     name="ano" 
                                                     onValueChange={this.handleChange} 
                                                     mode="decimal"
                                                     format={false} 
                                                     showButtons min={2020} max={2030} />                                       
                                    </FormGroup>            
                                </div>                                
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="bs-component">
                                <div className="grid p-fluid">
                                    <FormGroup htmlFor="inputMes" label="Mes: ">
                                        <Dropdown id="inputMes"
                                                  value={this.state.mes} 
                                                  options={meses}
                                                  name="mes" 
                                                  onChange={this.handleChange} 
                                                  optionLabel="label" 
                                                  placeholder="Selecione o mês..." />  
                                    </FormGroup>           
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="bs-component">
                                <div className="grid p-fluid">
                                    <FormGroup htmlFor="inputDescricao" label="Descrição: ">
                                        <InputText id="inputDescricao"
                                                   value={this.state.descricao}
                                                   name="descricao"
                                                   onChange={this.handleChange}                                         
                                                   placeholder="Digite o Descrição"/>
                                    </FormGroup>                                                        
                                </div>
                            </div>                                
                        </div>
                        <div className="col-md-6">
                            <div className="bs-component">
                                <div className="grid p-fluid">
                                    <FormGroup htmlFor="inputTipo" label="Tipo: ">
                                        <Dropdown id="inputTipo"
                                                  value={this.state.tipo} 
                                                  options={tipos}
                                                  name="tipo" 
                                                  onChange={this.handleChange} 
                                                  optionLabel="label" 
                                                  placeholder="Selecione o tipo..." />
                                    </FormGroup>                                                        
                                </div>
                            </div>                                
                        </div>
                    </div>                    
                    <div className="row">
                        <div className="col-md-6">
                            <div className="bs-component">
                                <div className="grid p-fluid">
                                    <FormGroup htmlFor="inputStatus" label="Status: ">
                                        <Dropdown id="inputStatus"
                                                  value={this.state.status} 
                                                  options={status}
                                                  name="status" 
                                                  onChange={this.handleChange} 
                                                  optionLabel="label" 
                                                  placeholder="Selecione o status..." />
                                    </FormGroup>                                                        
                                </div>
                            </div>                                
                        </div>                                                                                              
                        <div className="col-md-3">
                            <div className="bs-component">
                                <div className="grid p-fluid">
                                    <FormGroup htmlFor="inputDescricao" label=" *">
                                        <Button onClick={this.buscar} 
                                                icon="pi pi-search" 
                                                label="Consultar" 
                                                className="p-button-raised" />
                                    </FormGroup>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="bs-component">
                                <div className="grid p-fluid">
                                    <Button onClick={() => { window.location.href="/cadastro-lancamento"; }} 
                                            icon="pi pi-plus" 
                                            label="Cadastrar" 
                                            className="p-button-raised p-button-success" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>                    
                </Card>
                <div className="row">
                    <div className="col-md-12">
                        <br/>
                        <div className="bs-component">
                            <ConfirmDialog visible={this.state.visibleConfirm} 
                                           onHide={(e) => this.setState( currentState => ({ ...currentState, visibleConfirm: false }))} 
                                           message="Tem certeza que deseja deletar esse lançamento?"
                                           header="Confirmação" 
                                           icon="pi pi-exclamation-triangle" 
                                           accept={this.deletar} 
                                           reject={this.rejeitar}/>
                            <Dialog header="Editar Lançamento" 
                                    footer={footer}                                     
                                    visible={this.state.visibleDialog}                                    
                                    breakpoints={{'960px': '75vw', '640px': '100vw'}}
                                    style={{width: '925px', height: '486px', margin: '0px'}}                                     
                                    onHide={(e) => this.setState( currentState => ({ ...currentState, visibleDialog: false }))}>
                                <div className="container">                                    
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="bs-component">
                                                <FormGroup htmlFor="cadastroTipo" label="Tipo: ">                                    
                                                    <SelectButton id="cadastroTipo"
                                                                  value={this.state.lancamentoTemporario.tipo} 
                                                                  options={tipos}
                                                                  name="tipo" 
                                                                  onChange={this.onLancamentoTemporarioChange} />
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="bs-component">
                                                <div className="grid p-fluid">
                                                    <FormGroup htmlFor="cadastroStatus" label="Status: ">                                    
                                                    <SelectButton id="cadastroStatus"
                                                                  value={this.state.lancamentoTemporario.status} 
                                                                  options={status}
                                                                  name="status" 
                                                                  onChange={this.onLancamentoTemporarioChange} />
                                                </FormGroup>
                                                </div>
                                            </div>
                                        </div>
                                    </div>              
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="bs-component">
                                                <div className="grid p-fluid">
                                                   <FormGroup htmlFor="cadastroDescricao" label="Descrição: ">
                                                        <InputText id="inputDescricao"
                                                                   value={this.state.lancamentoTemporario.descricao}
                                                                   name="descricao"
                                                                   onChange={this.onLancamentoTemporarioChange}                                         
                                                                   placeholder="Digite o Descrição"/>
                                                   </FormGroup>                                                            
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="bs-component">
                                                <div className="grid p-fluid">
                                                    <FormGroup htmlFor="cadastroValor" label="Valor: ">
                                                        <InputNumber id="cadastroValor"
                                                                     inputId="currency-br" 
                                                                     value={this.state.lancamentoTemporario.valor}
                                                                     name="valor" 
                                                                     onValueChange={this.onLancamentoTemporarioChange} 
                                                                     mode="currency" 
                                                                     currency="BRL" 
                                                                     locale="pt-BR"/>
                                                    </FormGroup>           
                                                </div>
                                            </div>
                                        </div>
                                    </div>                    
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="bs-component">
                                                <div className="grid p-fluid">
                                                    <FormGroup htmlFor="cadastroMes" label="Mês: ">
                                                        <Dropdown id="cadastroMes"
                                                                  value={this.state.lancamentoTemporario.mes} 
                                                                  options={meses}
                                                                  name="mes" 
                                                                  onChange={this.onLancamentoTemporarioChange} 
                                                                  optionLabel="label" 
                                                                  placeholder="Selecione o mês..." />                                                            
                                                    </FormGroup>            
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="bs-component">
                                                <div className="grid p-fluid">
                                                    <FormGroup htmlFor="cadastroAno" label="Ano: ">
                                                        <InputNumber id="cadastroAno"
                                                                     inputId="minmax-buttons" 
                                                                     value={this.state.lancamentoTemporario.ano}
                                                                     name="ano" 
                                                                     onValueChange={this.onLancamentoTemporarioChange} 
                                                                     mode="decimal"
                                                                     format={false} 
                                                                     showButtons min={2020} max={2030} />                                                          
                                                    </FormGroup>            
                                                </div>
                                            </div>
                                        </div>
                                    </div>   
                                </div>
                            </Dialog>
                            <LancamentosTable lancamentos={this.state.lancamentos} 
                                              deleteAction={this.abrirConfirmacao} 
                                              editarAction={this.abrirDialogoEditar} />
                        </div>
                    </div>
                </div>
            </div>    
        )
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    <ConsultaLancamentos history={useNavigate()} />
);