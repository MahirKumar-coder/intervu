import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const authSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            select: false,
        },

        profileImage: {
            type: String,
            enum: ["candidate", "admin"],
            default: "candidate",
        },
    },
    {
        timestamps: true,
    }
)

authSchema.pre("save", async function () {
    if (!this.isModified("password")) return

    this.password = await bcrypt.hash(this.password, 10)
})

authSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", authSchema)

export default User