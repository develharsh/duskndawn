import initDB from '../../utils/initDB'
import User from '../../models/User'
import bcrypt from 'bcryptjs'

initDB()

const Signup = async (req, res) => {
    const { phone, password, name } = req.body
    try {
        const user = await User.findOne({ phone })
        if (user) {
            return res.status(422).json({ error: "Phone already exists" })
        }
        const hashedPass = await bcrypt.hash(password, 12)
        const newuser = await new User({
            name, phone, password: hashedPass
        }).save()
        //console.log(newuser)
        res.status(201).json({ message: "Success" })
    } catch (err) {
        return res.status(422).json({ error: "Some error occured" })
    }
}

export default Signup