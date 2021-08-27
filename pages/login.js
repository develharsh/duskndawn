import Link from 'next/link'
import { useState, useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import { useRouter } from 'next/router'
import cookie from 'js-cookie'
import Swal from 'sweetalert2'

const Login = (props) => {
  const router = useRouter()
  if (cookie.get('lvl')) {
    router.push('/')
  }
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const { state, dispatch } = useContext(DataContext)

  const userLogin = async (e) => {
    e.preventDefault()
    if (!password) {
      M.toast({ html: 'Sorry, All fields are required', classes: 'red' })
      return
    }
    dispatch({ type: 'NOTIFY', payload: { loading: true } })
    const res = await fetch(`${process.env.BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone, password
      })
    })
    const res2 = await res.json()
    dispatch({ type: 'NOTIFY', payload: { loading: false } })
    if (res2.error) {
      Swal.fire({
        icon: 'error',
        title: 'Sorry',
        text: res2.error
      })
    }
    else {
      let lvl = res2.user === 'u' ? 'shree' : 'yagya'
      cookie.set('token', res2.token)
      cookie.set('lvl', lvl)
      M.toast({ html: 'Log In Success', classes: 'green' })
      dispatch({ type: 'AUTH', payload: { token: res2.token, user: lvl } })
      router.push('/')
    }

  }

  return (
    <div className="signupDiv">
      <div className="container card signupcard center-align">
        <h3>Log In</h3>
        <form onSubmit={(e) => { userLogin(e) }}>
          <input type="text" placeholder="Phone" maxLength="10" minLength="10" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
          <span style={{ marginLeft: "30px" }}></span>
          <button className="btn waves-effect waves-light" type="submit" name="action">
          <i className="fas fa-sign-in-alt"></i> Log In
          </button>
        </form>
        <h5>New User? <Link href="/signup"><a style={{ color: "green" }}>Sign Up</a></Link></h5>
      </div>
    </div>
  )
}

export default Login