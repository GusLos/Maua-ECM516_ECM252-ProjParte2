// https://getbootstrap.com/docs/5.2/forms/checks-radios/
// https://getbootstrap.com/docs/5.2/components/card/
// https://reactjs.org/docs/forms.html#controlled-components
// https://axios-http.com/docs/example






import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Pedido from './Pedido'
import {Cartao} from './Cartao';
import Feedback from './Feedback';
import { MenuSuperior } from './MenuSuperior';
import { BrowserRouter, Route } from 'react-router-dom';



const RotaPedidos = () => {

  return(
    <div>Deveria ver pedidos</div>
  )
};
const RotaMesas = () => {

  return(
    <div>Deveria ver mesas</div>
  )
};
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

  // constructor(props){
  //   super(props);
  //   this.state = {paginaAtual:'menu'}
  // }




  // render(){
  //   return(
  //     <div className="container mt-2">
  //       {/* <div>

  //         <BrowserRouter>
  //           <Route path='/' component={Menu}></Route>
  //           <Route path='/Pedidos' component={Pedidos}></Route>
  //           <Route path='/Mesas' component={Mesas}></Route>
  //         </BrowserRouter>
  //       </div> */}
  //       {/* uma linha, conteúdo centralizado, display é flex */}
  //       <div className="row justify-content-center">
  //         {/* oito colunas das doze disponíveis serão usadas para telas médias em diante */}
  //         <div className="col-md-8">
  //           <h1>Pedidos</h1>
  //           <Cartao mesa='12' nomeCliente='andre' tempo='1:55'>
  //             <Pedido prato="File" acompanhamento="Arroz, feijão, salada, batata"></Pedido>
  //           </Cartao>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }



  render() {
    return(
      <BrowserRouter>
        <Route path='/' component={MenuSuperior}></Route>
        <Route path='/' component={pagina1}></Route>
        <Route path='/Pedidos' component={RotaPedidos}></Route>
        <Route path='/Mesas' component={RotaMesas}></Route>
      </BrowserRouter>
    )
  }


}




ReactDOM.render(

  <App />,

  document.querySelector("#root")
)