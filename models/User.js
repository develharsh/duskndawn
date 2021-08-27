import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            default: "u"
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.models.user || mongoose.model('user', userSchema)