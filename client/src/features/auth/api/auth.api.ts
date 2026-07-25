import api from "../../../lib/api"

export interface LoginBody {
    email: string
    password: string
}

export interface RegisterBody {
    fullName: string
    email: string
    password: string
}

export const login = async (data: LoginBody) => {
    const res = await api.post("/auth/login", data)
    return res.data
}

export const register = async (data: RegisterBody) => {
    const res = await api.post("/auth/register", data)
    return res.data
}

export const me = async () => {
    const res = await api.get("/auth/me")
    return res.data
}

export const logout = async () => {
    const res = await api.post("/auth/logout")
    return res.data
}