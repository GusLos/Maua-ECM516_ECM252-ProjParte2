import React from 'react'

export class Cartao extends React.Component {
    render(){
        return(
            <div className="card">
                <div className="card-header text-center">


                    <div className="row row-cols-2">
                        <div className="col">
                            <h6>Mesa: {this.props.mesa}</h6>
                        </div>
                        <div className="col">
                            <h6>Tempo corrido: {this.props.tempo}</h6>
                        </div>
                    </div>


                </div>

                <div className="crad-body mg-2">{this.props.children}</div>


                <div className="card-footer text-muted text-center">{this.props.nomeCliente}</div>

            </div>
        )
    }
}



// const Cartao = (props) => {
//     return(

//         <div className="card">
//             <div className="card-header text-center">


//                 <div className="row row-cols-2">
//                     <div className="col">
//                         <h6>Mesa: {props.mesa}</h6>
//                     </div>
//                     <div className="col">
//                         <h6>Pedido: {props.hora}</h6>
//                     </div>
//                 </div>


//             </div>

//             <div className="crad-body mg-2">{props.children}</div>


//             <div className="card-footer text-muted text-center">{props.nomeCliente}</div>

//         </div>


        // <div className="card">
        //     <div className="card-header d-flex">
        //         <p className='text-muted ms-3'>12/10/2022</p>
        //         <p className='text-muted ms-3'>Mesa A</p>
        //     </div>
        //     {/* <div className="card-header text-muted">{props.cabecalho}</div>
        //     <div className="card-header text-muted">Mesa A</div> */}
        //     <div className="card-body">{props.children}</div>
        // </div>
//     )
// }

// export default Cartao