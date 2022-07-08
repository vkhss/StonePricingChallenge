const fieldValidator = async (params: any, mandatoryFields: Array<string>) => {
    try {
        let missing: Array<string> = []

        let fields: Array<string> = []
        for (let prop in params) {
            fields.push(prop)
        }
        for (const mandatoryfield of mandatoryFields) {
            if (!fields.includes(mandatoryfield)) {
                missing.push(mandatoryfield)
            }

        }
        if (missing.length > 0) {
            let missingFields = missing.join(',')
            throw `Campos obrigatórios devem ser enviados no body da requisição ${missingFields}`
        }
    } catch (error) {
        throw error
    }
}



export default { fieldValidator }