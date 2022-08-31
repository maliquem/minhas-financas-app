import ApiService from '../apiservice';


export default class LancamentoService extends ApiService {
    
    constructor(){
        super('/api/lancamentos');
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