import asyncHandler from "../../utils/asyncHandler.js"

import ApiResponse from "../../utils/ApiResponse.js"

import * as DashboardService
from "./dashobard.service.js"

export const getDashboard = 
asyncHandler(async (req, res) => {
    
    const dashboard = 
    await DashboardService.getDashboard(
        req.user._id
    )

    res.status(200).json(

        new ApiResponse(

            200,

            dashboard,

            "Dashboard fetched"
        )
    )
})