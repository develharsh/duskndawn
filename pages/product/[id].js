import { useRouter } from 'next/router'
import { useRef, useEffect, useContext } from 'react'
import { DataContext } from '../../store/GlobalState'
import Image from 'next/image'
import Head from 'next/head'
import cookie from 'js-cookie'
import { addToCart } from '../../store/Actions'

const Productt = ({ product }) => {
    const router = useRouter()
    const { state, dispatch } = useContext(DataContext)
    const { cart } = state
    const modalRef = useRef(null)
    useEffect(() => {
        M.Modal.init(modalRef.current);
    })

    const getModal = () => {
        return (
            <div id="modal1" className="modal" ref={modalRef}>
                <div className="modal-content">
                    <h4>{product.title}</h4>
                    <p>Are you sure you want to delete this</p>
                </div>
                <div className="modal-footer">
                    <button className="btn modal-close waves-effect waves-light #1565c0 blue darken-3">
                        cancel
                    </button>
                    <button className="btn waves-effect waves-light #c62828 red darken-3"
                        onClick={() => deleteProduct()}
                    >
                        Yes
                    </button>
                </div>
            </div>

        )
    }

    return (
        <div >
            <Head>
                <title>Dusk&apos; n Dawn | {product.title}</title>
            </Head>
            <div className="roww">
                <Image src={product.mediaUrl} className="prodImg" width="800px" height="500px" alt="..." />
                <div>
                    <div style={{ marginLeft: "20px", marginTop: '20px' }}>
                        <button className="btn #000000 black" onClick={(e)=>dispatch(addToCart(product, cart))}>Add to Cart</button>
                    </div>

                </div>
            </div>
            <div style={{ marginTop: "20px" }}></div>
            {getModal()}
            <h4>{product.title}</h4>
            <h6>Price: {product.price}</h6>
            <h6>Description: {product.desc}</h6>
        </div>
    )
}

export async function getServerSideProps({ params: { id } }) {
    const res = await fetch(`${process.env.BASE_URL}/api/product/${id}`)
    const data = await res.json()
    return {
        props: { product: data.product }
    }
}

export default Productt