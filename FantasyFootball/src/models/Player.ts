import mongoose from 'mongoose'

export const playerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    playerName: { 
        type: String, 
        required: true,
    },
    player_id: {
        type: Number,
        required: true,
    },
    number: {
        type: Number, 
        required: true,
    },
    position: {
        type: String,
        required: true,
    }
})

export const Player = mongoose.model('Player', playerSchema)
