const validateProductId = async (productId: string, tpv: number, limit: number) => {
    try {
        switch (productId) {
            case '1':
            case '2':
                break;
            case '3':
                limit = tpv * 0.10
                break;
            default:
                throw 'O campo productId informado não está cadastrado no sistema para mais informações consulte a documentação!'
        }

        return limit
    } catch (error) {
        throw error
    }
}

export default { validateProductId }



