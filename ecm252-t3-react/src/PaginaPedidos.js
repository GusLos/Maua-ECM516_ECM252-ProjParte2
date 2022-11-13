import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Cartao} from './Cartao';
import Feedback from './Feedback';

const cabecalho = (numeroMesa, tempo) => {
    return(
        <div className="container">
            <div className="row row-cols-2">
                <div className="col"><h6>Mesa: {numeroMesa}</h6></div>
                <div className="col"><h6>Tempo corrido: {tempo}</h6></div>
            </div>
        </div>
    )
} ;

const corpo = (pedido, acompanhamento) => {
    return(
        <div className="container">
            <div className="row row-cols-2">
                <div className="col"><h4 className="text-center">{pedido}</h4></div>
                <div className="col bg-warning"><h4 className="text-center">{acompanhamento}</h4></div>
            </div>
        </div>
    )
};

const rodape = () => {
    return(
        <div>
            <Feedback textoOK="Finalizar pedido" textoNOK="Cancelar pedido"></Feedback>
        </div>
    )
};

export class PaginaPedidos extends React.Component{
  render(){
    return(
      <div className="container mt-2">
        {/* uma linha, conteúdo centralizado, display é flex */}
        <div className="row justify-content-center">
          {/* oito colunas das doze disponíveis serão usadas para telas médias em diante */}
          <div className="vstack gap-3 col-md-8">
            <h1>Pedidos</h1>
            
            <Cartao cabecalho={cabecalho('13', '12:35')} rodape={rodape()} >
                {corpo('File', 'arroz - feijão - batata - legumes')}
                {/* <Pedido prato="File" acompanhamento="arroz batata"></Pedido> */}
            </Cartao>

            <Cartao cabecalho={cabecalho('15', '13:05')} rodape={rodape()}>
                {corpo('Peixe ao molho camarão', 'arroz - feijão - batata - legumes')}
                {/* <Pedido prato="Frango" ></Pedido> */}
            </Cartao>
            
          </div>
        </div>
      </div>
    )
  }
}


