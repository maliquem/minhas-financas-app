import React from 'react';

export default props => {

    const rows = props.lancamentos.map ( lancamento => {
        return (
            <tr key={lancamento.id}>
                <th scope="row">{lancamento.descricao}</th>
                <td>{lancamento.valor}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>{lancamento.acoes}</td>
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
                    <th scope="col">Ações</th>
                </tr>
                <tbody>
                    {rows}
                </tbody>
            </thead>
        </table>
    )
}