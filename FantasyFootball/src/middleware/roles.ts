import { User }  from '../models/User'

export const checkRoles = (roles: string) => {
    return async (req:any, res:any, next:any) => { 
        let user:any
        try { 
            user = await User.findByJWT(res.locals.token)
            console.log(user)
        } catch (err) {
            res.status(401).send().json({ success: false, error: 'You are not authorized for this resource'})
        }

        if(roles == user.role) next()
        else res.status(401).send().json({ success: false, error: 'You are not authorized for this resource'})
    }
}
