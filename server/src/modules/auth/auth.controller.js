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

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // change to true in production with HTTPS
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

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

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

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
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    })

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