
export const randomColor = (): string => {
    const colors = ['#353535', '#353040', '#35423466', '#757345', '#925555', '#41394A', '#876446']

    const randomIndex = Math.floor(Math.random() * colors.length)

    const randomColor = colors[randomIndex]

    return randomColor
    // return '#35423466'
}

export const getRotation = (len: number, index: number) => {
    const mid = (len / 2)
    const diff = mid - index
    const angle = diff * 10
    // return 0
    return -angle
}

export const getTranslate = (len: number, index: number) => {
    const mid = (len / 2)
    const diff = index - mid
    console.log(`diff: ${diff} index: ${index} mid: ${mid} len: ${len}, translate: ${diff * 10}`)
    const translate = diff * 5
    // return 40
    return translate > 0 ? translate : -translate
}

export const getSortedByDate = (data: any[]) => {
    return data.sort((a, b) => {
        return new Date(a.created_At).getTime() - new Date(b.created_At).getTime()
    })
}

export const Reverse = (data: any[]) => {
    return data.sort((a, b) => {
        return new Date(b.created_At).getHours() - new Date(a.created_At).getHours()
    }
    )
}

export const daysAgo = (date: string) => {
    const today = new Date()
    const created_at = new Date(date)
    const diff = today.getTime() - created_at.getTime()
    const days = Math.floor(diff / (1000 * 3600 * 24))
    return days
}
export const addCommaToNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}