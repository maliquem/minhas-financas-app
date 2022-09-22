import React from 'react';
import { useNavigate } from 'react-router-dom';
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

class CadastroLancamentos extends React.Component {

    constructor(){
        super();
        this.service = new LancamentoService();        
    }

    state = {
        tipo: 'RECEITA',
        status: 'PENDENTE',
        valor: 0.00,
        mes: '',
        ano: 2022,
        descricao: ''
        //descricoes: [],
        //descricoesFiltradas: []
    }

    validar(){
        const msgs = [];

        if ( !this.state.tipo ){
            msgs.push('O campo Tipo é obrigatorio.');
        }
        
        if ( !this.state.status ){
            msgs.push('O campo Status é obrigatorio.');
        }

        if ( !this.state.valor ){
            msgs.push('O campo Valor é obrigatorio.');
        }

        if ( !this.state.mes ){
            msgs.push('O campo Mês é obrigatorio.');
        }

        if ( !this.state.ano ){
            msgs.push('O campo Ano é obrigatorio.');
        }

        if ( !this.state.descricao ){
            msgs.push('O campo Descrição é obrigatorio.');
        }        

        return msgs;
    }

    cadastrar = () => {
        const msgs = this.validar();
        const usuarioLogado = LocalStorageService.obterItem( '_usuario_logado' );

        if ( msgs.length > 0 ) {
            msgs.forEach ( ( msg ) => {
                mensagemAlerta( msg );
            })
            return false;
        }

        const lancamento = {
            descricao: this.state.descricao,
            mes: this.state.mes,
            ano: this.state.ano,
            valor: this.state.valor,
            tipo: this.state.tipo,
            status: this.state.status,
            usuario: usuarioLogado.id
        }

        this.service.salvar(lancamento)
            .then( response => {
            mensagemSucesso('Lançamento cadastrado com sucesso!');
            this.setState({tipo: 'RECEITA',
                           status: 'PENDENTE',
                           valor: 0.00,
                           mes: '',
                           ano: 2022,
                           descricao: ''})            
        }).catch( error => {
            mensagemErro(error.response.data);
        });
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState( currentState => ({ ...currentState, [name]: value}));
    }

    /* componentDidMount(){
        const usuarioLogado = LocalStorageService.obterItem( '_usuario_logado' );
        this.service.consultarDescricao(usuarioLogado.id)
                    .then(response => {                                               
                        this.setState( currentState => ({ ...currentState, descricoes: response.data }));                        
                    }).catch(error => {
                        mensagemErro(error.response.data);
                    });
    }

    pesquisarDescricao(event) {        
        setTimeout(() => {
            let descricoesFiltradas = [];
            if (!event.query.trim().length) {
                descricoesFiltradas = [...this.state.descricoes];
            }
            else {
                descricoesFiltradas = this.state.descricoes.filter( des => {
                    return des.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            this.setState( currentState => ({ ...currentState, descricoesFiltradas: descricoesFiltradas }));
        }, 250);
    } */
    
    render(){        

        const tipos = this.service.obterListaTipos();

        const meses = this.service.obterListaMeses();

        const status = this.service.obterListaStatus();

        return(
            <div className="container">
                <Card title="Cadastro Lançamentos">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="bs-component">
                                <FormGroup htmlFor="cadastroTipo" label="Tipo: *">                                    
                                    <SelectButton id="cadastroTipo"
                                                  value={this.state.tipo} 
                                                  options={tipos}
                                                  name="tipo" 
                                                  onChange={this.handleChange} />
                                </FormGroup>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="bs-component">
                                <div className="grid p-fluid">
                                    <FormGroup htmlFor="cadastroStatus" label="Status: ">                                    
                                    <SelectButton id="cadastroStatus"
                                                  value={this.state.status} 
                                                  options={status}
                                                  name="status" 
                                                  onChange={this.handleChange} />
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
                                    <FormGroup htmlFor="cadastroValor" label="Valor: *">
                                        <InputNumber id="cadastroValor"
                                                     inputId="currency-br" 
                                                     value={this.state.valor}
                                                     name="valor" 
                                                     onValueChange={this.handleChange} 
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
                        <div className="col-md-6">
                            <div className="bs-component">
                                <div className="grid p-fluid">
                                    <FormGroup htmlFor="cadastroAno" label="Ano: *">
                                        <InputNumber id="cadastroAno"
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
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="bs-component">
                                <div className="grid p-fluid">
                                    <Button onClick={this.cadastrar} 
                                            icon="pi pi-dollar" 
                                            label="Cadastrar" 
                                            className="p-button-raised p-button-success" />
                                </div>
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
    <CadastroLancamentos history={useNavigate()} />
);