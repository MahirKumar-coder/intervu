const isProduction = process.env.CLIENT_URL && !process.env.CLIENT_URL.includes("localhost");

export const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    partitioned: isProduction,
    maxAge: 7 * 24 * 60 * 60 * 1000
}

export const setAuthCookie = (res, token) => {
    res.cookie("token", token, cookieOptions)
}

export const clearAuthCookie = (res) => {
    res.clearCookie("token", cookieOptions)
}