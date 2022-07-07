import { NextFunction, Request, Response } from "express";

const pricingSimulation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tpv, sellerSeniority, customerSegment, uf, sellerPrice, productId } = req.body

        let measure = 0
        let useQtd = 1

        switch (productId) {
            case '1':
            case '2':
                break;
            case '3':
                useQtd = tpv * 0.10
                break;
            default:
                throw 'O campo productId informado não está cadastrado no sistema para mais informações consulte a documentação!'
        }

        //a) Definição de pesos para o TPV
        if (typeof tpv != 'number') throw 'O campo tpv deve conter valores do tipo numérico, para mais informações consulte a documentação!'
        measure += tpv / 1000

        //b) Definição de pesos para senioridade do vendedor
        switch (sellerSeniority.toLowerCase()) {
            case 'jr':
                measure += 5
                break;
            case 'pl':
                measure += 3
                break;
            case 'sr':
                measure += 1
                break;
            default:
                throw 'O campo "sellerSeniority" deverá apresentar valores validos, para mais informações consulte a documentação!'
        }

        //c) Definição de pesos para o segmento de negócio do cliente
        switch (customerSegment.toLowerCase()) {
            case 'food':
                measure += 10
                break;
            case 'clothing':
                measure += 9
                break;
            case 'construction':
                measure += 8
                break;
            case 'health':
                measure += 7
                break;
            case 'education':
                measure += 6
                break;
            case 'personalservices':
                measure += 5
                break;
            case 'specializedservices':
                measure += 4
                break;
            case 'it':
                measure += 3
                break;
            case 'sales':
                measure += 2
                break;
            case 'entertainment':
                measure += 1
                break;
            default:
                throw 'O campo "customerSegment" deverá apresentar valores validos, para mais informações consulte a documentação!'
        }

        //d) Definição de pesos para o estado no qual o cliente está localizado!
        switch (uf.toLowerCase()) {
            case 'sp':
                measure += 100
                break;
            case 'rj':
            case 'mg':
            case 'pr':
            case 'rs':
                measure += 70
                break;
            case 'sc':
            case 'ba':
            case 'pa':
            case 'es':
            case 'pe':
                measure += 50
                break;
            case 'am':
            case 'ce':
            case 'mt':
            case 'ms':
            case 'ma':
                measure += 40
                break;
            case 'pb':
            case 'se':
            case 'ro':
            case 'al':
            case 'pi':
            case 'to':
            case 'ap':
            case 'rr':
            case 'ac':
                measure += 20
                break;
            default:
                throw 'O campo "uf" deverá apresentar valores validos, para mais informações consulte a documentação!'
        }
        let sugestedPrice = measure
        let sugestedPricePerUse = productId == "3" ? Number((measure) / useQtd).toFixed(4) : 0
        let margin = 10
        let result, status, values

        if (sellerPrice > sugestedPrice && sellerPrice > (sugestedPrice + margin)) {

            result = `O Valor da venda está ACIMA do preço sugerido pela Pedregulho! Tente algo entre R$ ${sugestedPrice - margin} e R$ ${sugestedPrice + margin}`
            status = 400
        } else if (sellerPrice < sugestedPrice && sellerPrice < (sugestedPrice - margin)) {
            result = `O Valor da venda está ABAIXO do preço sugerido pela Pedregulho! Tente algo entre R$ ${sugestedPrice - margin} e R$ ${sugestedPrice + margin}`
            status = 400
        } else {
            result = `O Valor da venda está de ACORDO com o sugerido pela Pedregulho! Entre R$ ${sugestedPrice - margin} e R$ ${sugestedPrice + margin}`
            values = { sugestedPrice, sugestedPricePerUse }
            status = 200
        }

        return res.status(status).json(status == 200 ? { msg: result, values } : { failed: result })
    } catch (error) {
        return res.status(400).json({ error })
    }
}

export default { pricingSimulation }