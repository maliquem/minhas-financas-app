import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectButton } from 'primereact/selectbutton';
import { AutoComplete } from 'primereact/autocomplete';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import Card from 'components/card';
import LancamentoService from 'app/service/lancamentoService';
import FormGroup from 'components/form-group';
import LocalStorageService from 'app/service/localstorageService';
import { mensagemErro } from 'components/toastr';

class CadastroLancamentos extends React.Component {

    constructor(){
        super();
        this.service = new LancamentoService();        
    }

    state = {
        tipo: 'RECEITA',
        valor: null,
        mes: null,
        ano: null,
        descricao: null,
        descricoes: [],
        descricoesFiltradas: []
    }

    componentDidMount(){
        const usuarioLogado = LocalStorageService.obterItem( '_usuario_logado' );
        this.service.consultarDescricao(usuarioLogado.id)
                    .then(response => {                                               
                        this.setState({ descricoes: response.data });                        
                    }).catch(error => {
                        mensagemErro(error.response.data);
                    });
    }

    pesquisarDescricao(event) {        
        setTimeout(() => {
            let descricoesFiltradas = [];
            if (!event.query.trim().length) {
                descricoesFiltradas = this.state.descricoes;
            }
            else {
                descricoesFiltradas = this.state.descricoes.filter( des => {
                    return des.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            this.setState({ descricoesFiltradas: descricoesFiltradas });
        }, 250);
    }
    
    render(){        

        const tipos = this.service.obterListaTipos();

        const meses = this.service.obterListaMeses();

        return(
            <div className="container">
                <Card title="Cadastro Lançamentos">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="bs-component">
                                <FormGroup>
                                    <h5>Tipo</h5>
                                    <SelectButton value={this.state.tipo} 
                                                  options={tipos} 
                                                  onChange={(e) => this.setState({ tipo: e.value })} />
                                </FormGroup>
                            </div>
                        </div>
                    </div>              
                    <div className="row">
                        <div className="col-md-6">
                            <div className="bs-component">
                                <div className="grid p-fluid">
                                    <h5>Descrição</h5>            
                                    <AutoComplete value={this.state.descricao} 
                                                  suggestions={this.state.descricoesFiltradas} 
                                                  completeMethod={this.pesquisarDescricao}
                                                  onFocus={e => (console.log(this.state.descricoes))}                                                   
                                                  dropdown                                                                                                 
                                                  onChange={(e) => this.setState({ descricao: e.target.value })} 
                                                  aria-label="Countries" />
                                                            
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="bs-component">
                                <div className="grid p-fluid">
                                    <h5>Valor</h5>            
                                    <InputNumber inputId="currency-br" 
                                                 value={this.state.valor} 
                                                 onValueChange={(e) => this.setState({valor: e.target.value})} 
                                                 mode="currency" 
                                                 currency="BRL" 
                                                 locale="pt-BR" />
                                                            
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="bs-component">
                                <div className="grid p-fluid">
                                    <h5>Mês</h5>            
                                    <Dropdown value={this.state.mes} 
                                              options={meses} 
                                              onChange={(e) => this.setState({ mes: e.target.value })} 
                                              optionLabel="label" 
                                              placeholder="Selecione o mês..." />                                                            
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="bs-component">
                                <div className="grid p-fluid">
                                    <h5>Ano</h5>            
                                    <Calendar id="yearpicker" 
                                              value={this.state.ano} 
                                              onChange={(e) => this.setState({ ano: e.target.value })} 
                                              view="year" 
                                              dateFormat="yy" />                                                          
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