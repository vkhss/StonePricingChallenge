const customerSegment = async (customerSegment: string, measure: number) => {
    try {
        switch (customerSegment) {
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
        return measure
    } catch (error) {
        throw error
    }
}

export default { customerSegment }