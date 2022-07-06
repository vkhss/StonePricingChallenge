import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import mongo from 'mongoose'
import simulationRouter from './routers/simulation-routes';
import pnlRouter from './routers/pnl-routes';

const PORT = process.env.PORT
const HOST = process.env.HOST

const app = express()

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

app.use('/api/pricing', simulationRouter)
app.use('/api/pricing', pnlRouter)

app.use((req, res) => {
    res.status(404)
})

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOST}:${PORT}`)
})