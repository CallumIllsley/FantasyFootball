require('dotenv').config()
import express from 'express'
import userRouter  from './routers/user'
import ffRouter from './routers/FFRouter'
require('./db/db')

const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(ffRouter)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})