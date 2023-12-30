import { Pressable, Text, TouchableHighlight, Vibration, View } from "react-native";
import { TextStyle } from "../../styles/TextStyle";
import { randomColor } from "../../utils";
import { ExpenseType, LoanType } from "../../Types";
import ExpenseTypeIcon from "../Icon/ExpenseTypeIcon";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useState } from "react";
import { PlusIcon } from "../Icon";
import { deleteExpense } from "../../services/expense";
import { useDispatch } from "react-redux";

interface Props {
    id: number,
    title: string,
    amount: number,
    type: string,
    created_at: string,
}

export default function ExpenseItem(data: Props) {

    const daysAgo = (date: string) => {
        const today = new Date()
        const created_at = new Date(date)
        const diff = today.getTime() - created_at.getTime()
        const days = Math.floor(diff / (1000 * 3600 * 24))
        return days
    }

    const [toggle, setToggle] = useState(false)
    const dispatch = useDispatch()

    const handleDelete = () => {
        
        deleteExpense(dispatch, {
            id: data.id
        })
    }

    return (
        <Pressable
            onLongPress={() => {
                setToggle(!toggle)
                Vibration.vibrate(30)
                setTimeout(() => {
                    setToggle(false)
                    Vibration.vibrate(25)
                } , 2000)
            }}
        >
            <View
                style={{
                    backgroundColor: randomColor(),
                    borderRadius: 60,
                    padding: 12,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
                className=" min-h-34"
            >
                {
                    toggle &&
                    <View
                        style={{
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            borderRadius: 60,
                            zIndex: 100,
                        }}
                        className=" flex flex-row justify-center items-center p-4 "
                    >
                        <TouchableHighlight
                            onPress={() => {
                                handleDelete()
                                setToggle(!toggle)
                                Vibration.vibrate(50)
                            }}
                            className=" scale-[1] bg-[#ff6868] items-center justify-center rounded-full p-4 "
                        >
                            <Text
                                style={[TextStyle.smBold, {
                                    color: '#fff'
                                }]}
                            >
                                Delete
                            </Text>
                        </TouchableHighlight>
                    </View>
                }
                <View
                    className=" flex flex-row "
                >
                    <ExpenseTypeIcon type={data.type} />

                    <View
                        className=" flex flex-col justify-center ml-4 "
                    >
                        <Text
                            style={[TextStyle.mdBold, {
                                maxWidth: 110,
                            }]}
                        >
                            {data.title}
                        </Text>

                        {/* date */}

                        <View
                            className=" flex flex-row justify-between"
                        >

                            <Text
                                style={TextStyle.smLight}
                            >
                                {
                                    daysAgo(data.created_at) === 0 ? 'Today' : daysAgo(data.created_at) === 1 ? 'Yesterday' : `${daysAgo(data.created_at)} days ago`
                                }
                            </Text>

                        </View>
                    </View>

                    <View
                        className=" flex flex-col justify-center ml-4 "
                    >
                        <Text
                            style={TextStyle.xlLight}
                        >   -
                            {data.amount}
                        </Text>

                    </View>

                </View>

                <View
                    className=" flex flex-col "
                >

                </View>
            </View>
        </Pressable>
    )

}