import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import imageUpload from '../utils/imageUpload'
import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken'
import cookie from 'js-cookie'

const Create = (props) => {
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [desc, setDesc] = useState("")
    const [media, setMedia] = useState("")

    const handleSubmit = async (e) => {
        M.toast({ html: 'Please Wait', classes: 'blue' })
        e.preventDefault();

        const mediaUrl = await imageUpload(media);
        const wh = cookie.get('lvl')
        if (!wh) wh = ""
        const res = await fetch(`${process.env.BASE_URL}/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': wh
            },
            body: JSON.stringify({
                title, price, desc, media: mediaUrl
            })
        })
        const res2 = await res.json()
        if (res2.error) {
            M.toast({ html: res2.error, classes: 'red' })
        }
        else {
            M.toast({ html: res2.message, classes: 'green' })
            router.push('/show')
        }
    }

    return (
        <div style={{ marginTop: "30px" }}>
            <form className="container" onSubmit={(e) => { handleSubmit(e) }} >
                <input type="text" required placeholder="Title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                <input type="number" required placeholder="Price(Rs.)" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                <div className="file-field input-field">
                    <div className="btn">
                        <span>Image</span>
                        <input type="file" accept="image/*" required onChange={(e) => { setMedia(e.target.files[0]) }} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>

                <textarea id="textarea1" value={desc} placeholder="Description" required onChange={(e) => { setDesc(e.target.value) }} className="materialize-textarea"></textarea>
                <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                </button>
            </form>
        </div>
    )
}
export async function getServerSideProps({ req, res }) {
    // Parse
    try {
        /*if (req.cookies.lvl!=='yagya') {
            res.writeHead(302, { Location: "/" })
            res.end()
        }*/
    } catch (err) {
        res.writeHead(302, { Location: "/" })
        res.end()
    }
    return {
        props: {}
    }
}

export default Create
