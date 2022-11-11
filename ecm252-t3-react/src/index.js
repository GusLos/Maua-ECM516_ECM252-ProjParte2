// https://getbootstrap.com/docs/5.2/forms/checks-radios/
// https://getbootstrap.com/docs/5.2/components/card/
// https://reactjs.org/docs/forms.html#controlled-components
// https://axios-http.com/docs/example


import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { MenuSuperior } from './MenuSuperior';
import { BrowserRouter, Route } from 'react-router-dom';
import { PaginaPedidos } from './PaginaPedidos';
import { PaginaMesas } from './PaginaMesas';


const pagina1 = () => {
  return(
    <div>Deveria ver menu</div>
  )
};


class App extends React.Component{

  // constructor(props){
  //   super(props)
  //   this.state = {
  //     latitude: null,
  //     longitude: null,
  //     estacao: null,
  //     data: null,
  //     icone: null
  //   }
  // }


  render() {
    return(
      <BrowserRouter>
        <Route path='/' component={MenuSuperior}></Route>
        <Route path='/' exact component={pagina1}></Route>
        <Route path='/Pedidos' component={PaginaPedidos}></Route>
        <Route path='/Mesas' component={PaginaMesas}></Route>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector("#root")
)