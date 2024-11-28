import React from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  Vibration,
  VibrationStatic,
  Image,
} from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "../../components/Button";
import ExpenseList from "../../components/List/ExpenseList";
import AddExpenseModal from "../../components/Modal/AddExpenseModal";
import { TextStyle } from "../../styles/TextStyle";

const addIcon = require("../../../assets/icons/AddIcon.png");

const Home = () => {
  const [toggle, setToggle] = React.useState(true);
  const screen_height = Dimensions.get("screen").height;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          backgroundColor: "#121212",
          flex: 1,
        }}
      >
        <ExpenseList />

        <TouchableHighlight
          onPress={() => {
            setToggle(!toggle);
            Vibration.vibrate(25);
          }}
          className=" scale-[1] bg-[#303030] items-center justify-center bottom-4 right-4 p-6 rounded-full absolute "
        >
          <Image
            source={require("../../../assets/icons/AddIcon.png")}
            style={{
              width: 30,
              height: 30,
              resizeMode: "contain",
            }}
          />
        </TouchableHighlight>
      </SafeAreaView>

      <AddExpenseModal toggle={toggle} setToggle={setToggle} />
    </GestureHandlerRootView>
  );
};

export default Home;
