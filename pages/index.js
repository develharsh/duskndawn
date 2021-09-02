import Link from 'next/link'
import Head from 'next/head'
import { DataContext } from '../store/GlobalState'
import { useContext} from 'react'
export default function Home(props) {
  const { state, dispatch } = useContext(DataContext);
  const handleView=(e)=>{
    dispatch({ type: 'NOTIFY', payload: { loading: true } })
    setTimeout(function(){  dispatch({ type: 'NOTIFY', payload: { loading: false } }); }, 3000);
  }
  return (
    <div>
      <Head>
        <title>Dusk&apos;n Dawn | Home</title>
      </Head>
      <img src='/banner1.png' width="100%" height="100%" alt="..." />
      <h1 className="center-align homeBrand">Just for Testing.........</h1>
      <div className="center-align homeLinkShow">
        <Link href="/show"><a className="btn-large" onClick={(e)=>{handleView(e)}}>View Products</a></Link>
      </div>
    </div>
  )
}
export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
