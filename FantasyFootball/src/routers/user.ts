import express from 'express'
import { User } from '../models/User'
import { auth } from '../middleware/auth'

const router = express.Router()

router.post('/users', async (req:any, res:any) => {
    try {
        const user = new User(req.body)
        console.log("Before " + user)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req:any, res:any) => {
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)

        if(!user) {
            return res.status(400).send({ error: 'Login failed! Check your credentials and try again!'})
        }

        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (err) { 
        return res.status(400).send(err)
    }
})

router.post('/users/me/logout', auth, async (req:any, res) => {
    try { 
        req.user.tokens = req.user.tokens.filter((token:any) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (err) { 
        res.status(500).send(err)
    }
})

router.post('/users/me/logoutall', auth, async (req:any, res) => {
    try { 
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (err) { 
        res.status(500).send(err)
    }
})

router.get('/users/me', auth, async(req:any, res) => {
    res.send(req.user)
})

export default router;
