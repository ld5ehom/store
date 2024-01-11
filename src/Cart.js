import { useState } from 'react';
import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { quantityPlus, quantityMinus, deleteItem } from '../store/store.js'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//store.js Redux 
function Cart(){

    let state = useSelector((state)=> state)
    
    // request store.js (dispatch)
    let dispatch = useDispatch()

    // Order button Modal (bootstrap)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <div>
            <h4>{state.user.name}'s Shopping Cart</h4>

            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Qty</th>
                    <th>price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map((a, i)=>
                            <tr key={i}>
                                <td>{state.cart[i].id}</td>
                                <td>{state.cart[i].name}</td>
                                <td>{state.cart[i].count}</td>
                                <td>{state.cart[i].price}</td>
                                <td>
                                    <button onClick={()=>{ dispatch(quantityPlus(state.cart[i].id))  }}>+</button>
                                    <button onClick={()=>{ dispatch(quantityMinus(state.cart[i].id))  }}>-</button>
                                    <br/>
                                    <button onClick={()=>{ dispatch(deleteItem(state.cart[i].id))  }}>Delete</button>
                                </td>
                                <h5 align = "left">"Total :" {state.cart[i].count * state.cart[i].price}</h5>
                            </tr>
                        )
                    }

                    <Button variant="dark" onClick={handleShow}>
                        Proceed to checkout
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Order!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Thank you!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </tbody>
                
            </Table> 
        </div>
    )

}

export default Cart