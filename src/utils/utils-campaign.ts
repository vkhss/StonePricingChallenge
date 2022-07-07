const promotionalCampaigns = async (campaign: string, uf: string, tpv: number, measure: number) => {

    try {
        if (campaign == "10offsp") {
            if (uf == "sp") {
                measure = measure * 0.90
            } else {
                throw "Campanha informada não é valida para o estado informado!"
            }
        }

        if (campaign == "10offam" && uf == 'am') {
            if (uf == "am") {
                measure = measure * 0.90
            } else {
                throw "Campanha informada não é valida para o estado informado!"
            }
        }

        if (campaign == "10offpremium") {
            if (tpv >= 1000000) {
                measure = measure * 0.90
            } else {
                throw "Campanha informada não é valida para o valor de tpv informado!"
            }
        }

        if (campaign == "10offbasic") {
            if (tpv <= 5000) {
                measure = measure * 0.90
            } else {
                throw "Campanha informada não é valida para o valor de tpv informado!"
            }
        }

        return measure
    } catch (error) {
        throw error
    }
}

export default { promotionalCampaigns }