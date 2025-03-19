export const TransformationMassiv = (data) => {
    try {
        let massiv = []
        Object.values(data).forEach((el) => {
            massiv.push(el.data)
        })
        return massiv
    } catch (error) {
    }
}