import Link from 'next/link'
import Head from 'next/head'

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Dusk&apos;n Dawn | Home</title>
      </Head>
      <img src='/banner1.png' width="100%" height="100%" alt="..." />
      <h1 className="center-align homeBrand">Txt for Testing.........</h1>
      <div className="center-align homeLinkShow">
        <Link href="/show"><a className="btn-large">View Products</a></Link>
      </div>
    </div>
  )
}
export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
