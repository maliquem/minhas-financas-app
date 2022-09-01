import currencyFormatter from 'currency-formatter';
import React from 'react';
import { Button } from 'primereact/button';

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const converterMes = function (mes) {
        if (mes === 1) {
            return 'JANEIRO';
        }
        if (mes === 2) {
            return 'FEVEREIRO';
        }
        if (mes === 3) {
            return 'MARÇO';
        }
        if (mes === 4) {
            return 'ABRIL';
        }
        if (mes === 5) {
            return 'MAIO';
        }
        if (mes === 6) {
            return 'JUNHO';
        }
        if (mes === 7) {
            return 'JULHO';
        }
        if (mes === 8) {
            return 'AGOSTO';
        }
        if (mes === 9) {
            return 'SETEMBRO';
        }
        if (mes === 10) {
            return 'OUTUBRO';
        }
        if (mes === 11) {
            return 'NOVEMBRO';
        }
        if (mes === 12) {
            return 'DEZEMBRO';
        }
    }

    const rows = props.lancamentos.map ( lancamento => {
        return (
            <tr key={lancamento.id}>
                <th scope="row">{lancamento.descricao}</th>
                <td>{ currencyFormatter.format( lancamento.valor, { locale: 'pt-BR' } ) }</td>
                <td>{lancamento.tipo}</td>
                <td>{converterMes(lancamento.mes)}</td>
                <td>{lancamento.status}</td>
                <td>
                    <Button onClick={() => props.editarAction(lancamento.id)} 
                            icon="pi pi-pencil" 
                            className="p-button-rounded p-button-text" 
                            aria-label="Editar" />
                    <Button onClick={() => props.deleteAction(lancamento)} 
                            icon="pi pi-times" 
                            className="p-button-rounded p-button-danger p-button-text" 
                            aria-label="Deletar" />
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>            
        </table>
    )
}