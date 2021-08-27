import Link from "next/link"
import { useRef, useEffect } from 'react'
import { decrease, increase, deleteFromCart } from "../store/Actions"

const CartItem = (props) => {
    const { item, dispatch, cart } = props
    const modalRef = useRef(null)
    useEffect(() => {
        M.Modal.init(modalRef.current);
    })
    const getModal = () => {
        return (
            <div id={`modal${item._id}`} className="modal" ref={modalRef}>
                <div className="modal-content">
                    <h4>{item.title}</h4>
                    <p>Are you sure you want to delete this</p>
                </div>
                <div className="modal-footer">
                    <button className="btn modal-close waves-effect waves-light #1565c0 blue darken-3">
                        Cancel
                    </button>
                    <span style={{ marginLeft: "5px" }}></span>
                    <button className="btn waves-effect waves-light #c62828 red darken-3"
                        onClick={() => dispatch(deleteFromCart(cart, item._id))}
                    >
                        Yes
                    </button>
                </div>
            </div>

        )
    }

    //console.log(item)
    return (<div>
        {getModal()}
        <tr>
            <td style={{ width: '100px', overflow: 'hidden' }}>
                <img src={item.mediaUrl} alt='...' width='50px' height='50px' style={{ objectFit: 'cover', borderRadius: '100px' }} />
            </td>
            <td style={{ width: '100px', overflow: 'hidden' }}>
                <Link href={`/product/${item._id}`}><a>{item.title}</a></Link>
                <h6 className='text-dark'>{item.price} X {item.quantity}</h6>
                <h6>₹ {item.quantity * item.price}</h6>
            </td>
            <td className='align-middle'>
                <button className='cartMath' onClick={() => dispatch(decrease(cart, item._id))}>-</button>
                <span style={{ margin: '0px 3px 0px 3px' }}>{item.quantity}</span>
                <button className='cartMath' onClick={() => dispatch(increase(cart, item._id))}>+</button>
            </td>
            <td className='align-middle'>
                <button data-target={`modal${item._id}`} className='btnn modal-trigger #d50000 red accent-4' style={{ borderRadius: '20px' }}>
                    <i className="fas fa-trash"></i>
                </button>

            </td>
        </tr>
    </div>
    )
}
export default CartItem