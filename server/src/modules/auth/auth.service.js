import User from "./auth.model.js"
import ApiError from "../../utils/ApiError.js"

class AuthService {
    async register (data) {
        const { fullName, email, password } = data
        const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new ApiError(409, "User already exists");
        
        
    }

    const user = await User.create({
        fullName,
        email,
        password
    })

    return user
    }

    async login(data) {
        const { email, password } = data
        const user = await User.findOne({ email })
    .select("+password")

    if (!user) {
        throw new ApiError(401, "Invalid email and password")

    }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid email or password");
        
    }

    return user
    }

    async getCurrentUser(userId) {
        const user = await User.findById(userId)
            .select("-password")

        if (!user) {
            throw new ApiError(404, "User not found");
            
        }

        return user
    }
}

const authService = new AuthService()

export const registerUser = authService.register.bind(authService)
export const loginUser = authService.login.bind(authService)
export const getCurrentUser = authService.getCurrentUser.bind(authService)

export default authService