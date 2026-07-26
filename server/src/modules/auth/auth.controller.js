import { getCurrentUser, loginUser, registerUser } from "./auth.service.js";
import generateToken from "../../utils/generateToken.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { clearAuthCookie, setAuthCookie } from "../../utils/cookies.js";

export const register = asyncHandler( async (req, res) => {
    
        
        const { fullName, email, password } = req.body

        const user = await registerUser({
            fullName,
            email, 
            password
        })

        const token = generateToken(user._id)

        setAuthCookie(res, token)

        res.status(201).json(
            new ApiResponse(
                201,
                {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email
                },
                "User registered successfully"
            )
        )
    

        
        
    
})

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await loginUser({
        email,
        password
    })

    const token = generateToken(user._id)

    setAuthCookie(res, token)

    user.password = undefined

    res.status(200).json(
        new ApiResponse(
            200,
            user,
            "Login successful"
        )
    )
})


export const logout = asyncHandler(async (req, res) => {
    clearAuthCookie(res)

    res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Logout successful"
        )
    )
})

export const me = asyncHandler(async (req, res) => {

    const user = await getCurrentUser(req.user._id)

    res.status(200).json(
        new ApiResponse(
            200,
            user,
            "Current user fetched successfully"
        )
    )
    
})