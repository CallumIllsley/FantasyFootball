import { League, leagueSchema } from '../models/League'

export const createLeague = async (req:any, res:any) => {
    try {
        const league = new League(req.body)
        await league.save()
        res.status(201).send({ league })
    } catch (err) {
        res.status(400).send(err)
    }
}

export const deleteLeague = async (req:any, res:any) => {
    await League.findOneAndDelete({ _id: req.params.id }, (err, league) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!league) {
            return res.status(404).json({ success: false, error: `League not found` })
        }

        return res.status(200).json({ success: true, data: league })
    }).catch(err => console.log(err))
}

export const updateLeague = async (req:any, res:any) => {
    const body = req.body

    if(!body) {
        return res.status(400).json({ success: false, error: 'You must provide a body to update'})
    }

    League.findOne({ _id: req.params.id }, (err, league:any) => {
        if(err) {
            return res.status(404).json({ success: false, error: 'League not found' })
        }

        league.name = body.name
        league.league_id = body.league_id
        league.teams = body.teams

        league.save()
            .then(() => {
                return res.status(200)
                    .json({
                        success: true, 
                        id: league._id,
                        message: 'League updated'
                    })
            })
            .catch(() => {
                return res.status(404).json({ success: false, error: 'League not updated'})
            })
    })
}