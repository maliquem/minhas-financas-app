import ApiService from '../apiservice';


export default class LancamentoService extends ApiService {
    
    constructor(){
        super('/api/lancamentos');
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
            { label: 'DESPESA', value: 'DESPESA' },
            { label: 'RECEITA', value: 'RECEITA' }
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

    salvar(lancamento){
        return this.post('', lancamento);
    }

    deletar(id){
        return this.delete(`/${id}`);
    }


}