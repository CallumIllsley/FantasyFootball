import mongoose from 'mongoose'
import { teamSchema } from './Team'

export const leagueSchema = new mongoose.Schema({
    league_id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    teams: [teamSchema]
})

export const League = mongoose.model('League', leagueSchema)
