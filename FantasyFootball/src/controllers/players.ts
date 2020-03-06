import {Player} from '../models/Player'

export const createPlayer = async (req:any, res:any) => {
    try { 
        const team = new Player(req.body)
        await team.save()
        res.status(201).send({ team })
    } catch (err) {
        res.status(400).send(err)
    }
}

export const deletePlayer = async (req:any, res:any) => {
    await Player.findOneAndDelete({ _id: req.params.id }, (err, player) => {
        if(err) {
            return res.status(400).json({ success: false, error: err })
        }

        if(!player) {
            return res.status(404).json({ success: false, error: 'Player not found'})
        }

        return res.status(200).json({ success: true, data: player })
    }).catch(err => console.log(err))
}

export const updatePlayer = async (req:any, res:any) => {
    const body = req.body

    if(!body) {
        return res.status(400).json({ success: false, error: 'You must provide a body to update'})
    }

    Player.findOne({ _id: req.params.id }, (err, player:any) => {
        if (err) {
            return res.status(404).json({ success: false, error: 'Team not found' })
        }

        player.firstName = body.firstName
        player.lastName = body.lastName
        player.playerName = body.playerName
        player.player_id = body.player_id
        player.number = body.number
        player.position = body.position

        player.save()
            .then(() => {
                return res.status(200).json({ success: true, id: player._id, message: 'Player updated'})
            })
            .catch(() => {
                return res.status(404).json({ success: false, error: 'Player not updated'})
            })
    })
}