// https://getbootstrap.com/docs/5.2/forms/checks-radios/
// https://getbootstrap.com/docs/5.2/components/card/
// https://reactjs.org/docs/forms.html#controlled-components
// https://axios-http.com/docs/example
// https://www.cluemediator.com/url-parameters-with-react-router#:~:text=URL%20Parameters%20with%20React%20Router%201%201.%20Why,URL%20Parameters%20with%20Example%20...%204%204.%20Output


import React , { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, useLocation, Link } from 'react-router-dom';
import { PaginaPedidos } from './PaginaPedidos';
import { PaginaMesas } from './PaginaMesas';
import MenuSuperior from './MenuSuperior';
import PaginaMesa from './PaginaMesa';

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
        <Route path='/Mesas/Mesa/:idmesa' component={PaginaMesa}></Route>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector("#root")
)