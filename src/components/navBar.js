import React from 'react';
import NavabarItem from './navbarItem';

function Navbar(){
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="https://bootswatch.com/" className="navbar-brand">Minhas Finanças</a>
                <button className="navbar-toggler" 
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#navbarResponsive" 
                        aria-controls="navbarResponsive" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavabarItem href="/home" label="Home" />
                        <NavabarItem href="/cadastrar" label="Usuários" />
                        <NavabarItem href="/" label="Lançamentos" />
                        <NavabarItem href="/" label="Login" />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;