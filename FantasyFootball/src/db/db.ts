import mongoose from 'mongoose'

//@ts-ignore
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
})

export const database = mongoose.connection
