import initDB from '../../utils/initDB'
import User from '../../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

initDB()

const Login = async (req, res) => {
    const { phone, password } = req.body
    try {
        const user = await User.findOne({ phone })
        if (!user) {
            return res.status(400).json({ error: "No such user found" })
        }
        const doMatch = await bcrypt.compare(password, user.password)

        if (doMatch) {
            const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15m'
            })
            res.status(202).json({ token, user: user.role })
        }
        else {
            return res.status(400).json({ error: "No such user found" })
        }
    } catch (err) {
        return res.status(400).json({ error: "Something went Wrong during Login" })
    }
}

export default Login