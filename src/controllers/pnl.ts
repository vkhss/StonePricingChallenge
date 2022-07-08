import { NextFunction, Request, Response } from "express";
import Pnl from '../models/pnl'
import moment from "moment"
import utilsCampaign from "../utils/utils-campaign";
import utilsValidator from "../utils/utils-validator";
import utilsUf from "../utils/utils-uf";


//consulta de pnl
const getPnl = (req: Request, res: Response, next: NextFunction) => {
    Pnl.find(req.query)
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


//inserção automatizada das pnl na base
const sendPnl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //validação de campos
        const mandatoryFields: Array<string> = ['cnpj', 'productId', 'tpv', 'uf', 'campaign', 'revenues', 'manufacturingCost', 'shippingCost']
        await utilsValidator.fieldValidator(req.body, mandatoryFields)

        console.log("passou na validação de campos!")

        let startDate = moment().format('MM-YYYY');
        let endDate
        let split = 1
        let contractMouths = 10
        let productName: string
        const cnpj = req.body.cnpj;
        const productId = req.body.productId;
        const revenues: number = req.body.revenues;
        const tpv: number = req.body.tpv
        const manufacturingCost: number = req.body.manufacturingCost;
        const shippingCost: number = req.body.shippingCost;
        const campaign: string = req.body.campaign.toLowerCase()
        const uf: string = req.body.uf.toLowerCase()
        let pnlExists = false


        //validação de uf
        await utilsUf.uf(uf, 0)

        //validação de campanha
        await utilsCampaign.promotionalCampaigns(campaign, uf, tpv, 0)


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
            let useLimit = tpv * 0.10
            let revenuesPerUse = productId == "3" ? (revenues / useLimit) : 0

            const newPnl = new Pnl({
                cnpj,
                productId,
                productName,
                campaign,
                uf,
                startDate,
                endDate,
                tpv,
                revenues,
                revenuesPerUse,
                useLimit,
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

            if (i === split) return res.status(201).json({ "msg": "PNLs criadas com sucesso!" })
            startDate = endDate
            i += 1

        }
    } catch (error) {
        return res.status(400).json(error)
    }

}

export default { getPnl, sendPnl }