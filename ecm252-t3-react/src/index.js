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

  state = {
    pedidos: null
  }

  obterEstacao = (data, latitude) => {
      const anoAtual = data.getFullYear()
      //new Date(ano, mês(0 a 11), dia(1 a 31))
      //21/06
      const d1 = new Date(anoAtual, 5, 23)
      //24/09
      const d2 = new Date(anoAtual, 8, 24)
      //22/12
      const d3 = new Date(anoAtual, 11, 22)
      //21/03
      const d4 = new Date(anoAtual, 2, 21)
      const sul = latitude < 0;
      if (data >= d1 && data < d2)
        return sul ? 'Inverno' : 'Verão'
      if (data >= d2 && data < d3)
        return sul ? 'Primavera' : 'Outono'
      if (data >= d3 || data < d1)
        return sul ? 'Verão' : 'Inverno'
      return sul ? 'Outono' : 'Primavera'
    }

    obterLocalizacao = () => {
      window.navigator.geolocation.getCurrentPosition(
        (posicao) => {
          let data = new Date()
          let estacao = this.obterEstacao(data, posicao.coords.latitude);
          let icone = this.icones[estacao]
          console.log(icone)
          this.setState(
            {
              latitude: posicao.coords.latitude,
              longitude: posicao.coords.longitude,
              estacao: estacao,
              data: data.toLocaleTimeString(),
              icone: icone
            }
          )
        }
      )
    }



  render(){
    return(
      <div className="container mt-2">
        {/* uma linha, conteúdo centralizado, display é flex */}
        <div className="row justify-content-center">
          {/* oito colunas das doze disponíveis serão usadas para telas médias em diante */}
          <div className="col-md-8">
            <h1>Pedidos</h1>
            <Cartao mesa='12' nomeCliente='andre' tempo='1:55'></Cartao>
          </div>
        </div>
      </div>
    )
  }
}





// const App = () => {

//   const textoOK = "Já chegou"
//   const textoNOK = "Ainda não chegou"
//   const funcaoOK = () => alert('Agradecemos a confirmação.')
//   const funcaoNOK = () => alert('Verificaremos o ocorrido')
//   const componenteFeedback = <Feedback textoOK={textoOK} funcaoOK={funcaoOK} textoNOK={textoNOK} funcaoNOK={funcaoNOK} />
  
//   return (
//     <div className="container border rounded mt-2">
//       <div className="row border-bottom m-2">
//         <h1 className="display-5 text-center">Pedidos</h1>
//       </div>

//       <div className="row">
//         <div className="col-sm-8 col-md m-2">
//           <Cartao mesa='Café A' hora='12:35' nomeCliente='Ana'>
//             <Pedido prato='Frango grelhado' acompanhamento='legumes arroz feijão batata frita'/>
//             {componenteFeedback}
//           </Cartao>
//         </div>
//       </div>


//       <div className="row">
//         <div className="col-sm-8 col-md m-2">
//           <Cartao mesa='13' hora='12:50' nomeCliente='Claudia'>
//             <Pedido prato='Filé grelhado' acompanhamento='legumes arroz feijão batata frita'/>
//           </Cartao>
//         </div>
//       </div>


//     </div>
//   )
// }

ReactDOM.render(
  <App />,
  document.querySelector("#root")
)