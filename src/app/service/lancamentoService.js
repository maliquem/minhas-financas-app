import ErroValidacao from 'app/exceptions/ErroValidacao';
import ApiService from '../apiservice';


export default class LancamentoService extends ApiService {
    
    constructor(){
        super('/api/lancamentos');
    }

    validar(lancamento){
        const erros = [];

        if ( !lancamento.tipo ){
            erros.push('O campo Tipo é obrigatorio.');
        }

        if ( !lancamento.status ){
            erros.push('O campo Status é obrigatorio.');
        }

        if ( !lancamento.valor ){
            erros.push('O campo Valor é obrigatorio.');
        }

        if ( !lancamento.mes ){
            erros.push('O campo Mês é obrigatorio.');
        }

        if ( !lancamento.ano ){
            erros.push('O campo Ano é obrigatorio.');
        }

        if ( !lancamento.descricao ){
            erros.push('O campo Descrição é obrigatorio.');
        }        

        if (erros.length > 0) {
            throw new ErroValidacao(erros);
        }
    }

    obterListaMeses(){
        return [
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
    }

    obterListaTipos(){
        return [
            { label: 'RECEITA', value: 'RECEITA' },
            { label: 'DESPESA', value: 'DESPESA' }
        ]
    }

    obterListaStatus(){
        return [
            { label: 'PENDENTE', value: 'PENDENTE'},
            { label: 'CANCELADO', value: 'CANCELADO'},
            { label: 'EFETIVADO', value: 'EFETIVADO'}
        ]
    }

    consultar(lancamentoFiltro){
        let params = `?ano=${lancamentoFiltro.ano}`;

        if (lancamentoFiltro.mes) {
            params += `&mes=${lancamentoFiltro.mes}`;
        }

        if (lancamentoFiltro.descricao) {
            params += `&descricao=${lancamentoFiltro.descricao}`;
        }

        if (lancamentoFiltro.tipo) {
            params += `&tipo=${lancamentoFiltro.tipo}`;
        }

        if (lancamentoFiltro.status) {
            params += `&status=${lancamentoFiltro.status}`;
        }

        if (lancamentoFiltro.usuario) {
            params += `&usuario=${lancamentoFiltro.usuario}`;
        }

        return this.get(params);
    }

    consultarPorId(id){
        return this.get(`/${id}`);
    }

    consultarDescricao(id){
        return this.get(`/descricao/${id}`);
    }

    salvar(lancamento){
        return this.post('', lancamento);
    }

    atualizar(lancamento){
        return this.put(`/${lancamento.id}`, lancamento);
    }

    deletar(id){
        return this.delete(`/${id}`);
    }


}