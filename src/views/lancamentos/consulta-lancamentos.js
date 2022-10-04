import { USUARIO_LOGADO } from "app/service/authService";
import LancamentoService from "app/service/lancamentoService";
import LocalStorageService from "app/service/localstorageService";
import Card from "components/card";
import FormGroup from "components/form-group";
import { mensagemAlerta, mensagemErro, mensagemSucesso } from "components/toastr";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import LancamentosTable from "./lancamentosTable";

const { useState, default: React, useMemo } = require("react");

export default function ConsultaLancamentos() {
    const [lancamento, setLancamento] = useState({
        id: null,
        ano: 2022,
        descricao: '',
        mes: '',
        tipo: '',
        valor: 0.00,
        status: ''
    });    
    const [lancamentoTemporario, setLancamentoTemporario] = useState({
        id: null,
        ano: 2022,
        descricao: '',
        mes: '',
        tipo: '',
        valor: 0.00,
        status: ''
    });
    const [visibleConfirm, setVisibleConfirm] = useState(false);
    const [visibleDialog, setVisibleDialog] = useState(false);
    const [lancamentos, setLancamentos] = useState([]);  
    const service = useMemo(() => UserService(), []);
    const [listaMeses] = useState(service.obterListaMeses);
    const [listaTipos] = useState(service.obterListaTipos);
    const [listaStatus] = useState(service.obterListaStatus);
    const [usuarioLogado] = useState(LocalStorageService.obterItem( USUARIO_LOGADO ));   
    
    const abrirDialogoEditar = (id) => {
        service.consultarPorId(id).then( response => {
            const lancamentoFiltro = response.data;
            setLancamentoTemporario(lancamentoFiltro);
            setVisibleDialog(true);
        }).catch( error => {
            mensagemErro(error.response.data);
        })
    }

    const rejeitar = () => {
        setLancamentoTemporario({
            id: null,
            ano: 2022,
            descricao: '',
            mes: '',
            tipo: '',
            valor: 0.00,
            status: ''
        });
    }

    const abrirConfirmacao = (lancamento) => {
        setVisibleConfirm(true);
        setLancamentoTemporario(lancamento);
    }

    const deletar = () => {
        service.deletar(lancamentoTemporario.id)
                    .then( response => {
                        const lancamentosDel = lancamentos;
                        const index = lancamentosDel.indexOf(lancamentoTemporario);
                        lancamentosDel.splice(index, 1);
                        setLancamentos(lancamentosDel);
                        buscar();
                        mensagemSucesso('Lançamento deletado com sucesso.');
                    }).catch( error => {
                        mensagemErro(error.response.data);
                    })
    }    

    const atualizar = () => {   
        const { id, tipo, status, valor, mes, ano, descricao } = lancamentoTemporario;  
        const lancamento = {
            id, tipo, status, valor, mes, ano, descricao,
            usuario: usuarioLogado.id
        }

        try {
            service.validar(lancamento);
        } catch (erro) {           
            const mensagens = erro.msg;
            mensagens.forEach(msg => mensagemAlerta(msg));
            return false;
        }

        service.atualizar(lancamento)
            .then( response => {
            setVisibleDialog(false);          
            buscar();            
            mensagemSucesso('Lançamento atualizado com sucesso!');            
        }).catch( error => {
            mensagemErro(error.response.data);
        });
    }

    const buscar = () => {
        if (!lancamento.ano) {
            mensagemAlerta('Campo Ano é obrigatório.');
            return false;
        }
        
        const { ano, descricao, mes, tipo, status } = lancamento;

        const lancamentoFiltro = {
            ano, descricao, mes, tipo, status,
            usuario: usuarioLogado.id
        }

        service.consultar(lancamentoFiltro)
                    .then( response => {
                        const lista = response.data;
                        if (lista.length < 1) {
                            mensagemAlerta('Nenhum Lançamento encontrado.');
                        }
                        setLancamentos(lista);
                    }).catch( error => {
                        mensagemErro(error.response.data);
                    });       
                    
    }

    const handleLancamentoChange = (event) => {
         
        setLancamento(currentState => ({ ...currentState, [event.target.name]: event.target.value }));
    }

    const onLancamentoTemporarioChange = (event) =>{

        setLancamentoTemporario(currentState => ({ ...currentState, [event.target.name]: event.target.value }))
    }
    const footer = (
            <div>
                <Button label="Salvar" 
                        icon="pi pi-check" 
                        onClick={atualizar} />
                <Button label="Cancelar" 
                        icon="pi pi-times" 
                        onClick={(e) => setVisibleDialog(false)} />
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
                                                     value={lancamento.ano}
                                                     name="ano" 
                                                     onValueChange={handleLancamentoChange} 
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
                                                  value={lancamento.mes} 
                                                  options={listaMeses}
                                                  name="mes" 
                                                  onChange={handleLancamentoChange} 
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
                                                   value={lancamento.descricao}
                                                   name="descricao"
                                                   onChange={handleLancamentoChange}                                         
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
                                                  value={lancamento.tipo} 
                                                  options={listaTipos}
                                                  name="tipo" 
                                                  onChange={handleLancamentoChange} 
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
                                                  value={lancamento.status} 
                                                  options={listaStatus}
                                                  name="status" 
                                                  onChange={handleLancamentoChange} 
                                                  optionLabel="label" 
                                                  placeholder="Selecione o status..." />
                                    </FormGroup>                                                        
                                </div>
                            </div>                                
                        </div>                                                                                              
                        <div className="col-md-3">
                            <div className="bs-component">
                                <div className="grid p-fluid">
                                    <FormGroup htmlFor="buttonSearch" label=" *">
                                        <Button onClick={buscar} 
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
                                    <FormGroup htmlFor="buttonConsultar" label=" *">
                                        <Button onClick={() => { window.location.href="/cadastro-lancamento"; }} 
                                                icon="pi pi-plus" 
                                                label="Cadastrar" 
                                                className="p-button-raised p-button-success" />
                                    </FormGroup>
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
                            <ConfirmDialog visible={visibleConfirm} 
                                           onHide={(e) => setVisibleConfirm(false)} 
                                           message="Tem certeza que deseja deletar esse lançamento?"
                                           header="Confirmação" 
                                           icon="pi pi-exclamation-triangle" 
                                           accept={deletar} 
                                           reject={rejeitar}/>
                            <Dialog header="Editar Lançamento" 
                                    footer={footer} 
                                    visible={visibleDialog} 
                                    onHide={(e) => setVisibleDialog(false)} 
                                    breakpoints={{'960px': '75vw', '640px': '100vw'}}
                                    style={{width: '925px', height: '486px', margin: '0px'}}>
                                <EditarModal onLancamentoTemporarioChange={onLancamentoTemporarioChange} 
                                             lancamentoTemporario={lancamentoTemporario} 
                                             listaMeses={listaMeses} 
                                             listaStatus={listaStatus} 
                                             listaTipos={listaTipos}></EditarModal>
                            </Dialog>
                            <LancamentosTable lancamentos={lancamentos} 
                                              deleteAction={abrirConfirmacao} 
                                              editarAction={abrirDialogoEditar} />
                        </div>
                    </div>
                </div>
            </div>    
    )

}

function EditarModal(props) {
    return (
        <div className="container">                                    
            <div className="row">
                <div className="col-md-6">
                    <div className="bs-component">
                        <FormGroup htmlFor="cadastroTipo" label="Tipo: ">                                    
                            <SelectButton id="cadastroTipo"
                                          value={props.lancamentoTemporario.tipo} 
                                          options={props.listaTipos}
                                          name="tipo" 
                                          onChange={props.onLancamentoTemporarioChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="bs-component">
                        <div className="grid p-fluid">
                            <FormGroup htmlFor="cadastroStatus" label="Status: ">                                    
                            <SelectButton id="cadastroStatus"
                                          value={props.lancamentoTemporario.status} 
                                          options={props.listaStatus}
                                          name="status" 
                                          onChange={props.onLancamentoTemporarioChange} />
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
                                           value={props.lancamentoTemporario.descricao}
                                           name="descricao"
                                           onChange={props.onLancamentoTemporarioChange}                                         
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
                                             value={props.lancamentoTemporario.valor}
                                             name="valor" 
                                             onValueChange={props.onLancamentoTemporarioChange} 
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
                                          value={props.lancamentoTemporario.mes} 
                                          options={props.listaMeses}
                                          name="mes" 
                                          onChange={props.onLancamentoTemporarioChange} 
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
                                             value={props.lancamentoTemporario.ano}
                                             name="ano" 
                                             onValueChange={props.onLancamentoTemporarioChange} 
                                             mode="decimal"
                                             format={false} 
                                             showButtons min={2020} max={2030} />                                                          
                            </FormGroup>            
                        </div>
                    </div>
                </div>
            </div>   
        </div>
    )
}


function UserService() {
    return new LancamentoService();
}

