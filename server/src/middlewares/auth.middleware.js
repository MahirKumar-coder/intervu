import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../modules/auth/auth.model.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
    
    const token = req.cookies?.token
    
    if (!token) {
        throw new ApiError(401, "Unauthorized");
        
    }

    const decode = jwt.verify(
        token, 
        process.env.JWT_SECRET
    )

    const user = await User.findById(decode.id)
    .select("-password")


    if (!user) {
        throw new ApiError(401, "User not found");
        
    }

    req.user = user

    next()
})

export default verifyJWT