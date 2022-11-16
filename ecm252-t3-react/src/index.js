// https://getbootstrap.com/docs/5.2/forms/checks-radios/
// https://getbootstrap.com/docs/5.2/components/card/
// https://reactjs.org/docs/forms.html#controlled-components
// https://axios-http.com/docs/example
// https://www.cluemediator.com/url-parameters-with-react-router#:~:text=URL%20Parameters%20with%20React%20Router%201%201.%20Why,URL%20Parameters%20with%20Example%20...%204%204.%20Output


import React , { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, useLocation, Link } from 'react-router-dom';
import { PaginaPedidos } from './Paginas/PaginaPedidos';
import { PaginaMesas } from './Paginas/PaginaMesas';
import { PaginaAdicionarMesa } from './Paginas/PaginaAdicionarMesa';
import PaginaMesa from './Paginas/PaginaMesa'
import MenuSuperior from './MenuSuperior';


const pagina1 = () => {
  return(
    <div>Deveria ver menu</div>
  )
};

class App extends React.Component{

  render() {
    return(
      <BrowserRouter>
        <Route path='/' component={MenuSuperior}></Route>
        <Route path='/' exact component={pagina1}></Route>
        <Route path='/pedidos' component={PaginaPedidos}></Route>
        <Route exact path='/mesas' component={PaginaMesas}></Route>
        <Route path='/mesas/mesa/:idmesa' component={PaginaMesa}></Route>
        <Route path='/mesas/adicionar' component={PaginaAdicionarMesa}></Route>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector("#root")
)