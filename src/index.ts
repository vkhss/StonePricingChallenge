import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import mongo from 'mongoose'
import customersRouter from './routers/customers-routes'
import simulationRouter from './routers/simulation-routes';


const PORT = process.env.PORT

const HOST = process.env.HOST

console.log({ HOST, PORT })

const app = express()


app.get('/', (req, res) => {
    res.send('Bem-vindo!')
})

mongo
    .connect(`${process.env.MONGO_URI}`, {
    })
    .then(result => {
        console.log('MongoDB connected');
    })
    .catch(error => {
        console.log(error);
    });

app.use(cors({
    origin: ['http://localhost:3000']
}))

app.use('/api/pricing', customersRouter)
app.use('/api/pricing', simulationRouter)

app.use((req, res) => {
    res.status(404)
})

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOST}:${PORT}`)
})