import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'

const Home = ({ properties }) => {
    const { state, dispatch } = useContext(DataContext)
    const propList = properties.map(indivProp => {
        return (
        <div key={indivProp._id} >
            <Head>
                <title>Dusk&apos;n Dawn | Products</title>
            </Head>
            <div className="card pcard" title={indivProp.title} id={indivProp._id}>
                <div className="card-image" style={{ textAlign: "center" }}>
                    <Image src={indivProp.mediaUrl} width="312px" height="400px" objectFit="cover" alt="..." />
                </div>
                <div className="card-content">
                    <span>{indivProp.title}</span>
                    <p style={{ fontWeight: "bold" }}> ₹  {indivProp.price}/-</p>
                </div>
                <div className="card-action">
                    <Link href={`/product/${indivProp._id}`}><a className="btn btn-primary">View Product</a></Link>
                </div>
            </div>
        </div>
        )
    })

    /*Main Component Below*/
    return (
        <div>
            <div className="rootcard">
                {propList}
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const ress = await fetch(`${process.env.BASE_URL}/api/products`)
    const data = await ress.json()
    return {
        props: { properties: data }, // will be passed to the page component as props
    }
}

export default Home