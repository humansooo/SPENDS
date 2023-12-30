import React from 'react'
import { View, Text, TouchableHighlight, Dimensions, Vibration, VibrationStatic } from 'react-native'
import { Button } from '../../components/Button'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextStyle } from '../../styles/TextStyle'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { HomeCarousel } from '../../components/Carousel'
import HomeCatalog from '../../Features/Home/Calat'
import AddExpenseModal from '../../components/Modal/AddExpenseModal'
import { PlusIcon } from '../../components/Icon'

const Home = () => {

    const [toggle, setToggle] = React.useState(false)
    const screen_height = Dimensions.get('screen').height;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView
                style={{
                    backgroundColor: '#121212',
                    flex: 1,
                }}
            >
                <HomeCatalog setToggle={setToggle} />

                <TouchableHighlight
                    onPress={() => {
                        setToggle(!toggle)
                        Vibration.vibrate(25)
                    }}
                    className=" scale-[1] bg-[#303030] items-center justify-center bottom-4 right-4 p-6 rounded-full absolute "
                >
                    <PlusIcon />
                </TouchableHighlight>

            </SafeAreaView>

            <AddExpenseModal toggle={toggle} setToggle={setToggle} />

        </GestureHandlerRootView>
    )
}

export default Home