
export const randomColor = (): string => {
    const colors = ['#353535','#353040','#35423466','#757345','#925555','#41394A','#876446']

    const randomIndex = Math.floor(Math.random() * colors.length)

    const randomColor = colors[randomIndex]

    return randomColor
    // return '#35423466'
}