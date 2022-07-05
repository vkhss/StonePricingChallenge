import express from 'express'
import controller from '../controllers/customers';
import bodyParser from 'body-parser'

const jsonParser = bodyParser.json()

const customersRouter = express.Router();

customersRouter.post('/customers', jsonParser, controller.insertCustomer)

customersRouter.get('/customers', controller.getAllCustomers)

customersRouter.get('/customers/:cnpj', controller.getCustomerByCnpj)

export default customersRouter