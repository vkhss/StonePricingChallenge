const sellerSeniority = async (sellerSeniority: string, measure: number) => {
    try {
        switch (sellerSeniority) {
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

        return measure
    } catch (error) {
        throw error
    }
}

export default { sellerSeniority }