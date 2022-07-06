import { NextFunction, Request, Response } from "express";
import Pnl from '../models/pnl'
import moment from "moment"


const getPnl = (req: Request, res: Response, next: NextFunction) => {
    const cnpj = req.query.cnpj;
    const productId = req.query.productId;

    Pnl.find({ cnpj, productId })
        .exec()
        .then(results => {
            return res.status(200).json({
                pnls: results
            })
        })
        .catch(error => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })

}

const sendPnl = async (req: Request, res: Response, next: NextFunction) => {

    try {
        let startDate = moment().format('MM-YYYY');
        let endDate
        let split = 1
        let contractMouths = 10

        let productName: string
        const cnpj = req.body.cnpj;
        const productId = req.body.productId;
        const revenues: number = req.body.revenues;
        const tpv: string = req.body.tpv
        const manufacturingCost: number = req.body.manufacturingCost;
        const shippingCost: number = req.body.shippingCost;
        let pnlExists = false


        await Pnl.findOne({ cnpj, productId })
            .exec()
            .then(results => {
                if (results) {
                    pnlExists = true
                }
            }).catch(error => {
                return res.status(500).json(error);
            })

        if (pnlExists) {
            return res.status(500).json({
                message: 'Produto e CPNJ já foram cadastrados na base!'
            })
        }

        if (productId == '1') { //Produzido mensalmente, valor medio para 10 meses!
            productName = 'Pedra da Sorte'
        } else if (productId == '2') {  //Produzido uma unica vez, valor médio distribuido por 10 meses!
            contractMouths = 1
            split = 10
            productName = 'Pedra Roxa'

        } else if (productId == '3') { //produzido uma unica vez e cobrado por uso!
            productName = 'Pedra Fofa'
        } else {
            throw 'Id do produto informado não está cadastrado no sistema! Para mais informações consulte a documentação!'
        }

        let loop = Array(split).fill(1);
        let i = 1
        for (let l of loop) {
            endDate = moment(startDate, "MM-YYYY").add(contractMouths, 'M').format("MM-YYYY");
            let totalCost = (manufacturingCost + shippingCost) / split
            let taxes = (revenues * 0.1125) / split
            let margin = ((revenues - totalCost) - taxes) / split
            let marginPercentage = `${Number((((margin * 100) / revenues) / split).toFixed(2))}%`

            const newPnl = new Pnl({
                cnpj,
                productId,
                productName,
                startDate,
                endDate,
                revenues,
                manufacturingCost,
                shippingCost,
                totalCost,
                taxes,
                margin,
                marginPercentage
            });

            await newPnl
                .save()
                .then(result => {
                    console.log("pnl criada com sucesso")
                })
                .catch(error => {
                    return res.status(500).json(error);
                });

            i += 1
            startDate = endDate

            if (i === loop.length) return res.status(201).json({ "msg": "PNLs criadas com sucesso!" })
        }
    } catch (error) {
        return res.status(400).json(error)
    }

}

export default { getPnl, sendPnl }