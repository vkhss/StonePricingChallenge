import express from 'express'
import controller from '../controllers/pnl';
import bodyParser from 'body-parser'

const jsonParser = bodyParser.json()

const pnlRouter = express.Router();

pnlRouter.post('/pnl', jsonParser, controller.sendPnl)

pnlRouter.get('/pnl', controller.getPnl)


export default pnlRouter