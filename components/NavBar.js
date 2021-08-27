import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import cookie from 'js-cookie'

const NavBar = () => {
    const router = useRouter()
    const { state, dispatch } = useContext(DataContext);
    const { auth, cart } = state;
    const isActive = (r) => {
        if (r === router.pathname) {
            return "active"
        } else {
            return ""
        }
    }

    return (
        <div>
            <nav style={{ width: "100%", position:'fixed', zIndex:4 }}>
                <div className="nav-wrapper #1565c0 blue darken-3">
                    <Link href="/"><a className="brand-logo left">Dusk&apos;n Dawn</a></Link>
                    <ul id="nav-mobile" className="right">
                        <li className={isActive('/cart')}>
                            <Link href="/cart">
                                <a><i className="fas fa-shopping-cart position-relative">
                                            <span className='position-absolute'
                                                style={{
                                                    padding: '3px 6px', background: 'blue',
                                                    borderRadius: '50%',
                                                    top: '-14px',
                                                    right: '-10px',
                                                    color:'#fff',fontSize:'14px'
                                                }}
                                            >
                                                {cart.length}
                                            </span>
                                        </i>

                                </a>
                            </Link></li>
                        {Object.keys(auth).length !== 0
                            ? <>
                                <li><button className="btnLogOut"
                                    onClick={(e) => {
                                        cookie.remove('token'); cookie.remove('lvl'); dispatch({ type: 'AUTH', payload: {} })
                                        M.toast({ html: 'Logged Out', classes: 'green' })
                                    }}>
                                    Log Out
                                </button></li>
                            </>
                            :
                            <>
                                <li className={isActive('/login')}><Link href="/login"><a><i className="fas fa-user"></i></a></Link></li>
                            </>
                        }
                    </ul>
                </div>
            </nav>
            <div style={{ height: "83px" }}></div>
        </div>
    )
}

export default NavBar