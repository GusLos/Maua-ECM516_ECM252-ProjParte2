// https://getbootstrap.com/docs/5.2/forms/checks-radios/
// https://getbootstrap.com/docs/5.2/components/card/
// https://reactjs.org/docs/forms.html#controlled-components
// https://axios-http.com/docs/example


import React , { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, useLocation, Link } from 'react-router-dom';
import { PaginaPedidos } from './PaginaPedidos';
import { PaginaMesas } from './PaginaMesas';
import MenuSuperior from './MenuSuperior';


const pagina1 = () => {
  return(
    <div>Deveria ver menu</div>
  )
};

const Home = (props) => {
  Example();
  return (
    <>
      <h1>Home</h1>
      <hr />
      <p style={{ marginTop: '150vh' }}>
        <Link to="/contact">Go to contact page</Link>
      </p>
    </>
  );
};

const Example = props => {
  const location = useLocation();
  console.log(location.pathname);
}

const Contact = (props) => {
  Example();
  return (
    <>
      <h1>Contact</h1>
      <hr />
      <p style={{ marginTop: '150vh' }}>
        <Link to="/">Go to homepage</Link>
      </p>
    </>
  );
};





class App extends React.Component{

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