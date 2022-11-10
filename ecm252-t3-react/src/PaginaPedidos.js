import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Pedido from './Pedido'
import {Cartao} from './Cartao';
import Feedback from './Feedback';

const rodape = () => {
    return(
        <div>
            <Feedback textoOK="Finalizar pedido" textoNOK="Cancelar pedido"></Feedback>
        </div>
    )
}

const cabecalho = () => {} //Lembra, cartão agora precisa de cabeçalho, rodapé e o corpo

//                     <div className="row row-cols-2">
//                         <div className="col">
//                             <h6>Mesa: {this.props.mesa}</h6>
//                         </div>
//                         <div className="col">
//                             <h6>Pedido: {this.props.tempo}</h6>
//                         </div>
//                     </div>


export class PaginaPedidos extends React.Component{

  render(){
    return(
      <div className="container mt-2">
        {/* uma linha, conteúdo centralizado, display é flex */}
        <div className="row justify-content-center">
          {/* oito colunas das doze disponíveis serão usadas para telas médias em diante */}
          <div className="vstack gap-3 col-md-8">
            <h1>Pedidos</h1>


            <Cartao mesa='12' rodape={rodape()} tempo='1:55'>                   { /* Cartão não funciona mais assim, TROCAR/CONSERTAR */ }
                <Pedido prato="File" acompanhamento="arroz batata"></Pedido>
            </Cartao>

            <Cartao mesa='15' rodape={rodape()} tempo='4:55'>
                <Pedido prato="Frango" ></Pedido>
            </Cartao>

          </div>






        </div>
      </div>
    )
  }
}


