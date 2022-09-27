import ErroValidacao from 'app/exceptions/ErroValidacao';
import ApiService from '../apiservice';


export default class UsuarioService extends ApiService {
    
    constructor(){
        super('/api/usuarios');
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais)
    }

    obterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`);
    }

    salvar(usuario){
        return this.post('', usuario);
    }

    validar(usuario){
        const erros = [];

        if ( !usuario.nome ){
            erros.push('O campo Nome é obrigatorio.');
        }

        if ( !usuario.email ){
            erros.push('O campo Email é obrigatorio.');
        } else if ( !usuario.email.match( /[a-z0-9]+@[a-z0-9]+.[a-z0-9]{2,3}.?[a-z0-9]{2,3}/ ) ){
            erros.push('Informe um Email válido.');
        }

        if ( !usuario.senha || !usuario.senhaRepetida ){
            erros.push( 'O campo Senha é obrigatorio.' );
        } else if ( usuario.senha !== usuario.senhaRepetida ){
            erros.push( 'As senhas não são iguais.' )
        }

        if (erros.length > 0) {
            throw new ErroValidacao(erros);
        }
    }
}