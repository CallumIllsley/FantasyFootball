import express from 'express'
import { createLeague, deleteLeague, updateLeague } from '../controllers/leagues'
import { createTeam, deleteTeam, updateTeam } from '../controllers/teams'
import { createPlayer, deletePlayer, updatePlayer } from '../controllers/players'
import { auth } from '../middleware/auth'
import { checkRoles } from '../middleware/roles'

const router = express.Router()

router.post('/leagues', auth, checkRoles('basic'), createLeague)
router.delete('/leagues/:id', auth, checkRoles('basic'), deleteLeague)
router.put('/leagues/:id', auth, checkRoles('basic'), updateLeague)

router.post('/teams', auth, checkRoles('basic'), createTeam)
router.delete('/teams/:id', auth, checkRoles('basic'), deleteTeam)
router.put('/teams/:id', auth, checkRoles('basic'), updateTeam)

router.post('/players', auth, checkRoles('admin'), createPlayer)
router.delete('/players/:id', auth, checkRoles('admin'), deletePlayer)
router.put('/players/id', auth, checkRoles('admin'), updatePlayer)

export default router
