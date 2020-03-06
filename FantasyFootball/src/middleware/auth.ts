import jwt from 'jsonwebtoken'
import { User } from '../models/User'

export const auth = async (req: any, res:any, next:any) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    //@ts-ignore
    const data = jwt.verify(token, process.env.JWT_KEY)

    try {
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        if(!user) { 
            throw new Error()
        }

        req.user = user
        req.token = token
        res.locals.token = token
        next()
    } catch (err) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}
