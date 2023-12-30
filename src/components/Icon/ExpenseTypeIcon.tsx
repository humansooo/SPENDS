import { View } from "react-native"
import { EntertainmentIcon, FoodIcon, HealthIcon, ShoppingIcon, TravelIcon } from "."

interface Props {
    type: string,
}

const icon = (type: string) => {
    switch (type) {
        case 'Food':
            return <FoodIcon />
        case 'Shopping':
            return <ShoppingIcon />
        case 'Groceries':
            return <FoodIcon />
        case 'Entertainment':
            return <EntertainmentIcon />
        case 'Travel':
            return <TravelIcon />
        case 'Health':
            return <HealthIcon />
        default:
            return <FoodIcon />
    }
}

const ExpenseTypeIcon = ({ type }: Props) => {

    return (
        <View
            className=" flex items-center justify-center w-20 aspect-square bg-white rounded-full "
        >
            <View
                className=" -ml-1 "
            >
                {icon(type)}
            </View>
        </View>
    )
}



export default ExpenseTypeIcon
