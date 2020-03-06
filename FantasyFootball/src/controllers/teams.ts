import { Team } from '../models/Team'

export const createTeam = async (req:any, res:any) => {
    try {
        const team = new Team(req.body)
        await team.save()
        res.status(201).send({ team })
    } catch (err) {
        res.status(400).send(err)
    }
}

export const deleteTeam = async (req:any, res:any) => {
    await Team.findOneAndDelete({ _id: req.params.id }, (err, team) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!team) {
            return res.status(404).json({ success: false, error: 'Team not found' })
        }

        return res.status(200).json({ success: true, data: team })
    }).catch(err => console.log(err))
}

export const updateTeam = async (req:any, res:any) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({ success: false, error: 'You must provide a body to update' })
    }

    Team.findOne({ _id: req.params.id }, (err, team: any) => {
        if (err) {
            return res.status(404).json({ success: false, error: 'Team not found' })
        }

        team.name = body.name
        team.team_id = body.team_id
        team.players = body.players

        team.save()
            .then(() => {
                return res.status(200).json({ success: true, id: team._id, message: 'Team updated' })
            })
            .catch(() => {
                return res.status(404).json({ success: false, error: 'Team not updated' })
            })
    })
}
