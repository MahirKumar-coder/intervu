import dotenv from 'dotenv'

dotenv.config({ override: true })

const { default: app } = await import('./app.js')
const { default: connectDB } = await import('./config/database.js')

const PORT = process.env.PORT || 5000

connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
})