import React from 'react';
import PrimeBar from '../components/primeReactMenubar';
import Rotas from './rotas';
import 'toastr/toastr.js'
import 'toastr/build/toastr.css'
import '../css/bootstrap.css'
import '../css/custom.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons                             

export default function App() {
    return (
      <>
      <PrimeBar />
      <div className="container">
        <Rotas />
      </div>
      </>
    )
}


  