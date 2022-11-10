import React from 'react';
import ReactDOM from 'react-dom';
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

export class PaginaPedidos extends React.Component{

  render(){
    return(
      <div className="container mt-2">
        {/* uma linha, conteúdo centralizado, display é flex */}
        <div className="row justify-content-center">
          {/* oito colunas das doze disponíveis serão usadas para telas médias em diante */}
          <div className="vstack gap-3 col-md-8">
            <h1>Pedidos</h1>
            <Cartao mesa='12' rodape={rodape()} tempo='1:55'>
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


