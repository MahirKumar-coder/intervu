export const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
}

export const setAuthCookie = (res, token) => {
    res.cookie("token", token, cookieOptions)
}

export const clearAuthCookie = (res) => {
    res.clearCookie("token", cookieOptions)
}