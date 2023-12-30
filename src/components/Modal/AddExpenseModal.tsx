import { Dimensions, Text, TouchableHighlight, Vibration, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { randomColor } from "../../utils";
import { useEffect, useState } from "react";
import NumPad from "../Input/NumPad";
import { BlurView } from "@react-native-community/blur";
import TextField from "../Input/TextField";
import { OkIcon } from "../Icon";
import { useDispatch } from "react-redux";
import { addExpense } from "../../services/expense";

interface Props {
    toggle: boolean
    setToggle: (e: boolean) => void
}

const AddExpenseModal = ({
    // gesture,
    toggle,
    setToggle
}: Props) => {

    const translateY = useSharedValue(0);
    const context = useSharedValue({ y: 0 })

    const screen_height = Dimensions.get('screen').height;
    const MAX_TRANSLATE_Y = -screen_height / 1.4;
    const MIN_TRANSLATE_Y = 0;

    const setFalse = setTimeout(() => {
        setToggle(false)
    }, 10)

    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value }
        })
        .onUpdate((event) => {

            translateY.value = event.translationY + context.value.y;
            translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
            translateY.value = Math.min(translateY.value, MIN_TRANSLATE_Y);

            if (translateY.value < -screen_height / 2) {
                setFalse
            }

        }).onEnd(() => {

            // console.log('translateY.value', translateY.value, -screen_height / 2)

            if (translateY.value < -screen_height / 2) {

                translateY.value = withSpring(MAX_TRANSLATE_Y, { damping: 13, velocity: 20, restDisplacementThreshold: 20, overshootClamping: true });

            }
            else {
                translateY.value = withSpring(MIN_TRANSLATE_Y, { damping: 13, velocity: 20, restDisplacementThreshold: 20, overshootClamping: true });

            }
        })

    useEffect(() => {
        translateY.value = withSpring(MIN_TRANSLATE_Y, { damping: 13 });
    }, [])

    useEffect(() => {
        if (toggle) {
            translateY.value = withSpring(MAX_TRANSLATE_Y, { damping: 13 });
        }
    }
        , [toggle])

    const style = useAnimatedStyle(() => {
        return { transform: [{ translateY: translateY.value, }] }
    })

    // values

    const tempTitle= ['food 🥧','Pizza 🍕', 'burger 🍔', 'tea ☕️', 'coffee ☕️','drinks 🍹', 'shopping 🛒', 'movie 🎥', 'rent 🏠', 'car 🚗', 'gas ⛽️', 'travel 🚀', 'gifts 🎁', 'clothes 👕', 'groceries 🛒', 'books 📚', 'medical 🏥', 'pharmacy 💊', 'taxi 🚕', 'pets 🐶', 'sport ⚽️', 'gym 🏋️‍♀️', 'salary 💵', 'bonus 💵', 'presents 🎁', 'other 💰']

    const [title, setTitle] = useState(Math.random() > 0.5 ? tempTitle[Math.floor(Math.random() * tempTitle.length)] : 'food 🥧')
    const [value, setValue] = useState('')

    const dispatch = useDispatch()

    const handleAddExpense = () => {
        if (!value || !title) return

        addExpense(
            dispatch,
            {
                title,
                amount: Number(value)
            }
        )
    }

    useEffect(() => {
        setTitle(Math.random() > 0.5 ? tempTitle[Math.floor(Math.random() * tempTitle.length)] : 'food 🥧')
        setValue('')
    } , [toggle])

    return (
        <GestureDetector
            gesture={gesture}
        >
            <Animated.View
                style={[{
                    height: screen_height,
                    width: '100%',
                    backgroundColor: '#202020',
                    position: 'absolute',
                    top: screen_height,
                }, style]}
                className={' items-center  z-10 rounded-[50px] '}
            >
                <View
                    className={' w-20 h-1 bg-[#aaaaaa] rounded-full top-3 absolute '}
                />

                <Animated.View
                    className={' pt-8 px-6'}
                    style={[useAnimatedStyle(() => {
                        return { transform: [{ translateY: translateY.value < -screen_height / 4 ? withTiming(0, { duration: 500 }) : withTiming(300, { duration: 500 }) }] }
                    })]}
                >

                    <View
                        className=" mb-4 flex-row w-full items-center  "
                    >

                        <TextField
                            placeholder={'food 🥧'}
                            value={title}
                            onChangeText={(e) => setTitle(e)}
                            style={{ flex: 1 }}
                        />

                        <TouchableHighlight
                            onPress={() => {
                                setToggle(false)
                                translateY.value = withSpring(MIN_TRANSLATE_Y, { damping: 13 });
                                Vibration.vibrate(50)
                                handleAddExpense()
                            }}
                            className=" ml-2 bg-[#baffa7] items-center justify-center p-3 rounded-full"
                        >
                            <OkIcon />
                        </TouchableHighlight>

                    </View>

                    <NumPad
                        open={true}
                        value={value}
                        setValue={setValue}
                    />
                </Animated.View>

            </Animated.View>
        </GestureDetector>
    )
};

export default AddExpenseModal;