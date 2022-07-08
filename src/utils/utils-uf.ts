const uf = async (uf: string, measure: number = 0) => {
    try {
        switch (uf) {
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

        return measure
    } catch (error) {
        throw error
    }
}

export default { uf }