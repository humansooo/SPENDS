import { Text, TouchableHighlight, View } from "react-native";
import { HomeCarousel } from "../../components/Carousel";
import { useState } from "react";
import { TextStyle } from "../../styles/TextStyle";
import { ScrollView } from "react-native-gesture-handler";
import ExpenseList from "../../components/List/ExpenseList";
import { useSelector } from "react-redux";
import { categorySelector } from "../Expense/ExpenseSlice";
import { PlusIcon } from "../../components/Icon";

export default function HomeCatalog({
    setToggle
}: any) {

    const data = useSelector(categorySelector)

    const [selected, setSelected] = useState('All')
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                gap: 12,
                paddingTop: 50,
                // paddingBottom: 100,
            }}
        >

            {/* <View
            >
                <Text
                    style={[TextStyle.xlBold]}
                    className=" mb-0 px-4 text-right"
                >
                    spends.
                </Text>
            </View> */}

            

            <HomeCarousel data={data} selected={selected} onChange={(e) => setSelected(e)} />

            <ExpenseList selected={selected} />

        </ScrollView>
    )
}