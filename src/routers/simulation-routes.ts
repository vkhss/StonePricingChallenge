import express from 'express'
import controller from '../controllers/simulation';
import bodyParser from 'body-parser'

const jsonParser = bodyParser.json()

const simulationRouter = express.Router();

simulationRouter.post('/simulation', jsonParser, controller.pricingSimulation)

export default simulationRouter