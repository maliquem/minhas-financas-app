import { Menubar } from 'primereact/menubar';
import AuthService from 'app/service/authService';
import React from 'react';

export default function PrimeBar() {   
   
    const logado = AuthService.isUsuarioAutenticado();    

    const items = [
         {
             label: 'Home',
             icon: 'pi pi-home',
             disabled: !logado,            
             command:()=>{ window.location.href="/home"}
         },
         {
             label: 'Usuários',
             icon: 'pi pi-user',
             disabled: !logado,
             command:()=>{ window.location.href="/cadastar"}
         },
         {
             label: 'Lançamentos',
             icon: 'pi pi-dollar',
             disabled: !logado,
             items: [{label: 'Consultar', icon: 'pi pi-search',command:()=>{ window.location.href="/consulta-lancamento"; }},
                     {label: 'Cadastrar', icon: 'pi pi-plus',command:()=>{ window.location.href="/cadastro-lancamento"; }} ]
         },
         {
             label: 'Sair',
             icon: 'pi pi-sign-out',
             disabled: !logado,
             command:()=>{ AuthService.removerUsuarioAutenticado();
                           window.location.href="/"; }
         }
         
     ];

     const start = <img alt="logo" src="https://raw.githubusercontent.com/maliquem/minhas-financas-app/master/src/resources/images/logo.png" height="60" className="mr-2"></img>;
     return (
         <div className="navbar navbar-expand-lg fixed-top navbar-light bg-primary">
             <div className="container">
                 <Menubar model={items} start={start} />
             </div>
         </div>
     );
    
}
                 