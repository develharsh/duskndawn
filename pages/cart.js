import Head from 'next/head'
import { useContext, useState, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import CartItem from '../components/CartItem'
import Link from 'next/link'
import Swal from 'sweetalert2'
import $ from 'jquery'
import {useRouter} from 'next/router'

const My_Cart = () => {
    const router=useRouter()
    const { state, dispatch } = useContext(DataContext)
    const { cart } = state
    const [total, setTotal] = useState(0)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [addr, setAddr] = useState('')
    const handleCheckout = (e) => {
        e.preventDefault();
        if (!name || !addr) {
            Swal.fire({
                icon: 'error',
                title: 'Sorry',
                text: 'Name and Address is required'
            })
            return
        }
        /*SMS START*/
        let data = 'ORDER ALERT- DUSK\'N DAWN '
        cart.forEach(item => {
            data += '%0a https://duskndawn.in/product/' + item._id + ' (Quantity:' + item.quantity + ') %0a '
        })
        data += 'ORDERED By: %0a Name: ' + name + ' %0a Phone: ' + phone + ' %0a Address:' + addr
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://www.fast2sms.com/dev/bulkV2?authorization=8Uf1mCgXNSYjx5lnIMzvHtbrsKaQ74EAu0PLVwiRc6TqO2eGBWFuyxsU3zmp7QD5AEhHL9rdeY2Ia6To&message=" + data.toString() + "&language=english&route=q&numbers=9711244137",
            "method": "GET"
        }

        $.ajax(settings).done(function (response) {
             //console.log(response);
        });
        //console.log(data)
        /*SMS END*/
        Swal.fire(
            'Congratulations',
            'Details Submitted Successfully, We will contact you soon.',
            'success'
        )
        dispatch({ type: 'ADD_CART', payload: [] })
        router.push('/show')
    }
    useEffect(() => {
        const getTotal = () => {
            const res = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)
            setTotal(res)
        }
        getTotal()
    }, [cart])
    if (cart.length === 0) {
        return (
            <div>
                <Head>
                    <title>My Cart | Dusk&apos;n Dawn</title>
                </Head>
                <div className='container'>
                    <marquee direction="left" scrollamount="15"><h2 className='text-danger'>Sorry, No Items in you Cart.</h2></marquee>
                    <h2 className='text-info'>Please add items.</h2>
                    <div style={{ height: '350px' }}></div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Head>
                <title>My Cart | Dusk&apos;n Dawn</title>
            </Head>
            <h2 className='center-align'>Shopping Cart</h2>
            <p className='center-align'>Click Product Name to view Details</p>
            <div>
                <table style={{ display: 'flex', justifyContent: 'center' }}>
                    <tbody>
                        {
                            cart.map(item => (
                                <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className='container center-align'>
                <h3>Payable: <span className='text-dark'>₹ {total}</span></h3>
                <button className="btn #00e676 green accent-3" type="submit" name="action"
                    onClick={(e) => { document.getElementById('coff').style.display = 'block' }}>
                    <i className="fas fa-check-circle"></i> Continue with Above Products
                </button>
                <div className="container center-align" style={{ display: 'none' }} id='coff'>
                    <h6>Please fill your details below.</h6>
                    <form onSubmit={(e) => { handleCheckout(e) }}>
                        <input type="text" placeholder="Full Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                        <input type="text" placeholder="Phone" maxLength="10" minLength="10" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                        <textarea id="textarea1" value={addr} placeholder="Proper Address" onChange={(e) => { setAddr(e.target.value) }} className="materialize-textarea"></textarea>
                        <button className="btn waves-effect waves-light" type="submit" name="action">
                        <i className="fas fa-shopping-bag"></i> Checkout
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
}
export default My_Cart
