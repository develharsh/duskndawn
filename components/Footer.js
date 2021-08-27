import Link from 'next/link'

const Footer = () => {
    return (
        <div style={{ marginTop: "100px" }}>
            <footer className="page-footer #000000 black">
                <div className="container">
                    <div className="row">
                        <div className="col l6 s12">
                            <h5 className="white-text">Thanks for Visiting</h5>
                            <p className="grey-text text-lighten-4">&copy; Dusk&apos;n Dawn</p>
                        </div>
                        <div className="col l4 offset-l2 s12">
                            {
                                /*<h5 className="white-text">Links</h5>
                                <ul>
                                    <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
                                    <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
                                    <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
                                    <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
                                </ul>*/
                            }
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        &copy; 2021 Dusk&apos;n Dawn
                        <Link href="/login"><a className="grey-text text-lighten-4 right">More Links</a></Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
export default Footer