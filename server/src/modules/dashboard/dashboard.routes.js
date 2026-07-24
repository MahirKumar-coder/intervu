import express from "express"

import verifyJWT from "../../middlewares/auth.middleware.js"

import * as DashboardController
from "./dashboard.controller.js"

const router = express.Router()

router.get(

    "/",

    verifyJWT,

    DashboardController.getDashboard
)

export default router