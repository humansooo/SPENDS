import { useEffect, useState } from "react";
import { Dimensions, TouchableHighlight, Vibration, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import CategorySelector from "./CategorySelector";
import { addExpense } from "../../services/expense";
import { useStore } from "../../store/Store";
import { OkIcon } from "../Icon";
import NumPad from "../Input/NumPad";
import TextField from "../Input/TextField";

interface Props {
  toggle: boolean;
  setToggle: (e: boolean) => void;
}

const AddExpenseModal = ({
  // gesture,
  toggle,
  setToggle,
}: Props) => {
  const { addCategory: addCat, addExpense: addEx } = useStore();

  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  const screen_height = Dimensions.get("screen").height;
  const MAX_TRANSLATE_Y = -screen_height / 1.4 - 30;
  const MIN_TRANSLATE_Y = 0;

  const [selectorToggle, setSelectorToggle] = useState(false);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      translateY.value = Math.min(translateY.value, MIN_TRANSLATE_Y);

      if (translateY.value < -screen_height / 2) {
        // setFalse
      }
    })
    .onEnd(() => {
      if (translateY.value < -screen_height / 2) {
        translateY.value = withSpring(MAX_TRANSLATE_Y, {
          damping: 15,
          velocity: 20,
          restDisplacementThreshold: 20,
          overshootClamping: true,
        });
      } else {
        translateY.value = withSpring(MIN_TRANSLATE_Y, {
          damping: 15,
          velocity: 20,
          restDisplacementThreshold: 20,
          overshootClamping: true,
        });
      }
    });

  const panGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      // use this for gesture handler
      onStart: () => {
        context.value = { y: translateY.value };
      },
      onActive: (event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
        translateY.value = Math.min(translateY.value, MIN_TRANSLATE_Y);

        if (translateY.value < -screen_height / 2) {
          // setFalse
        }
      },
      onEnd: () => {
        if (translateY.value < -screen_height / 2) {
          translateY.value = withSpring(MAX_TRANSLATE_Y, {
            damping: 15,
            velocity: 20,
            restDisplacementThreshold: 20,
            overshootClamping: true,
          });
        } else {
          translateY.value = withSpring(MIN_TRANSLATE_Y, {
            damping: 15,
            velocity: 20,
            restDisplacementThreshold: 20,
            overshootClamping: true,
          });
        }
      },
    });

  useEffect(() => {
    translateY.value = withSpring(MIN_TRANSLATE_Y, { damping: 15 });
  }, []);

  const handleToggle = () => {
    if (toggle) {
      translateY.value = withSpring(MAX_TRANSLATE_Y, { damping: 15 });
      setToggle(false);
    } else {
    }
  };

  useEffect(() => {
    handleToggle();
  }, [toggle]);

  const handleSelectorToggle = (i: any) => {
    if (!selectorToggle) {
      if (i < 4) return;
      translateY.value = withTiming(MAX_TRANSLATE_Y - 150, { duration: 525 });
    } else {
      translateY.value = withTiming(MAX_TRANSLATE_Y, { duration: 525 });
    }
  };

  const style = useAnimatedStyle(() => {
    return { transform: [{ translateY: translateY.value }] };
  });

  // values

  const tempTitle = [
    "food 🥧",
    "Pizza 🍕",
    "burger 🍔",
    "tea ☕️",
    "coffee ☕️",
    "drinks 🍹",
    "shopping 🛒",
    "movie 🎥",
    "rent 🏠",
    "car 🚗",
    "gas ⛽️",
    "travel 🚀",
    "gifts 🎁",
    "clothes 👕",
    "groceries 🛒",
    "books 📚",
    "medical 🏥",
    "pharmacy 💊",
    "taxi 🚕",
    "pets 🐶",
    "sport ⚽️",
    "gym 🏋️‍♀️",
    "presents 🎁",
    "other 💰",
  ];

  const [title, setTitle] = useState(() =>
    Math.random() > 0.5
      ? tempTitle[Math.floor(Math.random() * tempTitle.length)]
      : "food 🥧",
  );
  const [value, setValue] = useState("");

  const handleAddExpense = () => {
    if (!value || !title) return;

    addExpense({
      addCat,
      addEx,
      data: {
        title,
        amount: Number(value),
      },
    });
  };

  useEffect(() => {
    setTitle(tempTitle[Math.floor(Math.random() * tempTitle.length)]);
    setValue("");
  }, [toggle]);

  const handleAddExpenseBtn = () => {
    setToggle(false);
    setSelectorToggle(false);
    translateY.value = withSpring(MIN_TRANSLATE_Y, { damping: 13 });
    Vibration.vibrate(50);
    handleAddExpense();
  };

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          {
            height: screen_height,
            width: "100%",
            backgroundColor: "#202020",
            position: "absolute",
            top: screen_height,
            zIndex: 1,
          },
          style,
        ]}
        className=" items-center  rounded-[50px] "
      >
        <View className=" w-20 h-1 bg-[#aaaaaa] rounded-full top-3 absolute " />

        <Animated.View
          className=" pt-8 px-6"
          style={[
            useAnimatedStyle(() => {
              return {
                transform: [
                  {
                    translateY:
                      translateY.value < -screen_height / 4
                        ? withTiming(0, { duration: 500 })
                        : withTiming(300, { duration: 500 }),
                  },
                ],
              };
            }),
          ]}
        >
          <View className=" mb-4 flex-row w-full items-center  ">
            <TextField
              placeholder="food 🥧"
              value={title}
              onChangeText={(e) => setTitle(e)}
              style={{ flex: 1 }}
            />

            <TouchableHighlight
              onPress={handleAddExpenseBtn}
              className=" ml-2 bg-[#baffa7] items-center justify-center p-3 rounded-full"
            >
              <OkIcon />
            </TouchableHighlight>
          </View>

          <CategorySelector
            selected={title}
            setSelected={setTitle}
            selectorToggle={selectorToggle}
            setSelectorToggle={setSelectorToggle}
            handleSelectorToggle={handleSelectorToggle}
          />

          <NumPad open value={value} setValue={setValue} />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default AddExpenseModal;
