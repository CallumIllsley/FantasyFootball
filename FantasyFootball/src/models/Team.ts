import mongoose from 'mongoose'
import { playerSchema } from '../models/Player'

export const teamSchema = new mongoose.Schema({
    team_id: {
        type: Number, 
        required: true,
    }, 
    name: {
        type: String, 
        required: true,
    }, 
    players: [playerSchema],
})

export const Team = mongoose.model('Team', teamSchema)

