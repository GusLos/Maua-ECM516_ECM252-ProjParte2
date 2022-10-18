import React from 'react'
import { ReactDOM } from 'react-dom'

const Pedido = ({prato, acompanhamento}) => {
    return (

        <div className="d-flex">
            <div className="d-flex align-items-center">
                <i></i>
            </div>
            <div className="flex-grow-1 ms-2 border">
                <h4 className="text-center">{prato}</h4>
                <p className="text-center">{acompanhamento}</p>
            </div>
        </div>

    )
}
export default Pedido;