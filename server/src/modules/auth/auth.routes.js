import express from 'express'
import { login, logout, me, register } from './auth.controller.js'
import validate from '../../middlewares/validate.middleware.js'
import { loginSchema, registerSchema } from './auth.validation.js'
import verifyJWT from '../../middlewares/auth.middleware.js'

const router = express.Router()

router.post(
    "/register", 
    validate(registerSchema),
    register)

router.post(
    "/login",
    validate(loginSchema),
    login
)

router.post("/logout", verifyJWT, logout)

router.get(
    "/me",
    verifyJWT,
    me
)

export default router