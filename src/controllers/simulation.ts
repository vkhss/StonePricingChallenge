import { NextFunction, Request, Response } from "express";
import utilsCampaign from '../utils/utils-campaign'
import utilsTpv from '../utils/utils-tpv'
import utilsSeller from '../utils/utils-seller'
import utilsProduct from "../utils/utils-product";
import utilsCustomer from "../utils/utils-customer";
import utilsUf from "../utils/utils-uf";
import utilsSimulation from "../utils/utils-simulation";
import utilsValidator from "../utils/utils-validator";

const pricingSimulation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mandatoryFields: Array<string> = ['cpnj', 'tpv', 'uf', 'productId', 'sellerPrice', 'sellerSeniority', 'customerSegment']
        await utilsValidator.fieldValidator(req.body, mandatoryFields)

        let { tpv, sellerSeniority, customerSegment, uf, sellerPrice, productId, campaign } = req.body
        let measure = 0
        let limit: number = 1

        uf = uf.toLowerCase()
        sellerSeniority = sellerSeniority.toLowerCase()
        customerSegment = customerSegment.toLowerCase()

        // diferenciação de preços por productId
        limit = await utilsProduct.validateProductId(productId, tpv, limit)

        //a) Definição de pesos para o TPV
        measure = await utilsTpv.enumTpv(tpv, measure)

        //b) Definição de pesos para senioridade do vendedor
        measure = await utilsSeller.sellerSeniority(sellerSeniority, measure)

        //c) Definição de pesos para o segmento de negócio do cliente
        measure = await utilsCustomer.customerSegment(customerSegment, measure)


        //d) Definição de pesos para o estado no qual o cliente está localizado!
        measure = await utilsUf.uf(uf, measure)

        // 4) Campanhas promocionais
        if (campaign) {
            measure = await utilsCampaign.promotionalCampaigns(campaign, uf, tpv, measure)
        }

        //calculo de preço 
        const result = await utilsSimulation.pricing(measure, productId, limit, sellerPrice)

        return res.status(result.status).json(result.status == 200 ? { msg: result.msg, values: result.values } : { failed: result })

    } catch (error) {
        return res.status(400).json(error)
    }
}

export default { pricingSimulation }