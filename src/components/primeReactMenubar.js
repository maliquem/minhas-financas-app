
import React, { Component } from 'react';
import { Menubar } from 'primereact/menubar';

export default class PrimeBar extends Component {

    constructor(props) {
        super(props);

        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                command:()=>{ window.location.href="/home"}
            },
            {
                label: 'Usuários',
                icon: 'pi pi-user',
                command:()=>{ window.location.href="/cadastar"}
            },
            {
                label: 'Lançamentos',
                icon: 'pi pi-dollar',
                items: [{label: 'Buscar', icon: 'pi pi-search',command:()=>{ window.location.href="/consulta-lancamento"; }},
                        {label: 'Cadastrar', icon: 'pi pi-plus',command:()=>{ window.location.href="/cadastro-lancamento"; }} ]
            }
            
        ];
    }

    render() {
        const start = <img alt="logo" src="https://raw.githubusercontent.com/maliquem/minhas-financas-app/master/src/resources/images/logo.png" height="60" className="mr-2"></img>;

        return (
            <div className="navbar navbar-expand-lg fixed-top navbar-light bg-primary">
                <div className="container">
                    <Menubar model={this.items} start={start} />
                </div>
            </div>
        );
    }
}
                 