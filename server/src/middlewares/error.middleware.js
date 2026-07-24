const errorHandler = (err, req, res, next) => {
    
    console.error("Server Error Stack:", err.stack)

    const statusCode = err.statusCode || err.status || 500

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    })
}

export default errorHandler