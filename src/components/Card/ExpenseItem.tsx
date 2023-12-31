import { Pressable, Text, TouchableHighlight, Vibration, View } from "react-native";
import { TextStyle } from "../../styles/TextStyle";
import { daysAgo, getRotation, getTranslate, randomColor } from "../../utils";
import { useEffect, useState } from "react";
import { PlusIcon } from "../Icon";
import { deleteExpense } from "../../services/expense";
import { useDispatch } from "react-redux";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { REMOVE_ALL_EXPENSE } from "../../Features/Expense/ExpenseSlice";

interface Props {
    id: number,
    title: string,
    amount: number,
    type: string,
    created_at: string,
}

export default function ExpenseItem(data: Props) {

    const [toggle, setToggle] = useState(false)
    const dispatch = useDispatch()

    const handleDelete = () => {
        // dispatch(REMOVE_ALL_EXPENSE())
        deleteExpense(dispatch, {
            id: data.id
        })
    }

    const deleteOpacity = useSharedValue(0)

    const deleteStyle = useAnimatedStyle(() => {
        return {
            opacity: deleteOpacity.value,
            display: deleteOpacity.value === 0 ? 'none' : 'flex',
        }
    }
    )

    useEffect(() => {
        if (toggle) {
            deleteOpacity.value = withTiming(1,{
                duration: 500
            })
        } else {
            deleteOpacity.value = withTiming(0,{
                duration: 500
            })
        }
    }, [toggle])

    return (
        <Pressable
            onLongPress={() => {
                setToggle(!toggle)
                Vibration.vibrate(30)
                setTimeout(() => {
                    setToggle(false)
                    Vibration.vibrate(25)
                }, 2000)
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
                className=" h-[80px] flex flex-row justify-between items-center "
            >
                <Animated.View
                    style={[{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        position: 'absolute', 
                        
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        borderRadius: 60,
                        zIndex: 100,
                    }, deleteStyle]}
                    className=" flex flex-row justify-center items-center p-4 "
                >
                    <TouchableHighlight
                        onPress={() => {
                            handleDelete()
                            setToggle(!toggle)
                            Vibration.vibrate(50)
                        }}
                        underlayColor="#ff6868"
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
                </Animated.View>

                <View
                    className=" flex flex-row "
                >
                    {/* <ExpenseTypeIcon type={data.type} /> */}

                    <View
                        className=" flex flex-col justify-center "
                    >
                        <View
                            className=" flex flex-row "
                        >
                            <Text
                                style={[TextStyle.mdBold, {
                                    // maxWidth: 110,
                                }]}
                            >
                                {data.amount}
                            </Text>

                        </View>
                    </View>

                    <View
                        className=" flex flex-col justify-center ml-4 "
                    >
                        <Text
                            style={[TextStyle.mdBold, {
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


                </View>

            </View>
        </Pressable>
    )

}