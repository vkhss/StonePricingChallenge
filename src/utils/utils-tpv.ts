const enumTpv = async (tpv: number, measure: number) => {
    try {
        if (typeof tpv != 'number') throw 'O campo tpv deve conter valores do tipo numérico, para mais informações consulte a documentação!'
        measure += tpv / 1000
        return measure
    } catch (error) {
        throw error
    }
}

export default { enumTpv }