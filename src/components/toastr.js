import toastr from 'toastr';

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-top-left",
  "preventDuplicates": false,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

export function mostrarMensagem( tipo, mensagem, titulo ){
    toastr[tipo](mensagem, titulo);
}

export function mensagemErro(mensagem){
    mostrarMensagem( 'error', mensagem, 'ERRO' );
}

export function mensagemSucesso(mensagem){
    mostrarMensagem( 'success', mensagem, 'SUCESSO' );
}

export function mensagemAlerta(mensagem){
    mostrarMensagem( 'warning', mensagem, 'ALERTA' );
}