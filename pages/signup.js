import Link from 'next/link'
import { useState, useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import { useRouter } from 'next/router'
import cookie from 'js-cookie'
import Swal from 'sweetalert2'

const Signup = (props) => {
  const { state, dispatch } = useContext(DataContext)
  const router = useRouter()
  if (cookie.get('token')) {
    router.push('/')
  }
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  const userSignup = async (e) => {
    e.preventDefault()
    if (!password || !name) {
      M.toast({ html: 'Sorry, All fields are required', classes: 'red' })
      return
    }
    dispatch({ type: 'NOTIFY', payload: { loading: true } })
    const res = await fetch(`${process.env.BASE_URL}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name, phone, password
      })
    })
    dispatch({ type: 'NOTIFY', payload: { loading: false } })
    const res2 = await res.json()
    if (res2.error) {
      Swal.fire({
        icon: 'error',
        title: 'Sorry',
        text: res2.error
      })
    }
    else {
      Swal.fire(
        'Congratulations',
        'New Account Created, Now Please Login',
        'success'
      )
        ; router.push('/login')
    }

  }

  return (
    <div className="signupDiv">
      <div className="container card signupcard center-align">
        <h3>Sign Up</h3>
        <h5>Welcome {name}</h5>
        <form onSubmit={(e) => { userSignup(e) }}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} />
          <input type="text" placeholder="Phone" maxLength="10" minLength="10" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
          <span style={{ marginLeft: "30px" }}></span>
          <button className="btn waves-effect waves-light" type="submit" name="action">
          <i className="fas fa-sign-in-alt"></i> Create Account
          </button>
        </form>
        <h5>Already have Account? <Link href="/login"><a style={{ color: "green" }}>Login</a></Link></h5>
      </div>
    </div>
  )
}

export default Signup