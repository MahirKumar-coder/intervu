import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'

dotenv.config({ override: true })

const { default: app } = await import('./app.js')
const { default: connectDB } = await import('./config/database.js')

const PORT = process.env.PORT || 5000

connectDB()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
})

io.on('connection', (socket) => {
    console.log('Socket client connected:', socket.id)
    
    socket.on('join_interview', (interviewId) => {
        socket.join(interviewId)
        console.log(`Socket joined interview room: ${interviewId}`)
    })

    socket.on('join_dashboard', (userId) => {
        socket.join(`user_${userId}`)
        console.log(`Socket joined dashboard room for user: ${userId}`)
    })
    
    socket.on('disconnect', () => {
        console.log('Socket client disconnected:', socket.id)
    })
})

app.set('io', io)

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})