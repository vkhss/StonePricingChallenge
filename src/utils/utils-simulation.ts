
const pricing = async (measure: number, productId: string, limit: number, sellerPrice: number) => {
    let status: number, msg: string, values: object = {}
    let margin: number = 10

    try {
        let sugestedPrice = measure
        let sugestedPricePerUse = productId == "3" ? Number((measure) / limit).toFixed(4) : 0

        if (sellerPrice > sugestedPrice && sellerPrice > (sugestedPrice + margin)) {

            msg = `O Valor da venda está ACIMA do preço sugerido pela Pedregulho! Tente algo entre R$ ${sugestedPrice - margin} e R$ ${sugestedPrice + margin}`
            status = 400
        } else if (sellerPrice < sugestedPrice && sellerPrice < (sugestedPrice - margin)) {
            msg = `O Valor da venda está ABAIXO do preço sugerido pela Pedregulho! Tente algo entre R$ ${sugestedPrice - margin} e R$ ${sugestedPrice + margin}`
            status = 400
        } else {
            msg = `O Valor da venda está de ACORDO com o sugerido pela Pedregulho! Entre R$ ${sugestedPrice - margin} e R$ ${sugestedPrice + margin}`
            values = { sugestedPrice, sugestedPricePerUse }
            status = 200
        }

        return { msg, values, status }

    } catch (error) {
        throw error
    }

}

export default { pricing }