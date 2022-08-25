import ApiService from '../apiservice';


export default class LancamentoService extends ApiService {
    
    constructor(){
        super('/api/lancamentos');
    }

    salvar(lancamento){
        return this.post('', lancamento);
    }

    deletar(id){
        return this.delete(`/${id}`);
    }


}