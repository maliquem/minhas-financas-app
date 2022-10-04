import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/card';

export default function NotFound() {
    return(
       <div className="container">
            <div className="row">
                <div className="col-md-6" style={ {position : 'relative', left : '300px'}}>
                    <Card title="Pagina não Encontrada">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <fieldset>
                                            <Link to="/">
                                                <button className="btn btn-danger">Voltar</button>
                                            </Link>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
       </div>
    )
}
