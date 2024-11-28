import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { TextStyle } from "../../styles/TextStyle";

interface props {
  selected: string;
  setSelected: (e: string) => void;
  selectorToggle: boolean;
  setSelectorToggle: (e: boolean) => void;
  handleSelectorToggle: (e: any) => void;
}

const CategorySelector = (props: props) => {
  const tempTitle = [
    "food 🥧",
    "tea ☕️",
    "coffee ☕️",
    "shopping 🛒",
    "movie 🎥",
    "rent 🏠",
    "fuel ⛽️",
    "travel 🚀",
    "gifts 🎁",
    "clothes 👕",
    "groceries 🛒",
    "books 📚",
    "pharmacy 💊",
    "taxi 🚕",
    "sport ",
    "other 💰",
  ];

  const [toggle, setToggle] = useState(false);
  const [title, setTitle] = useState(tempTitle);
  const animated_height = useSharedValue(0);

  const animated_style = useAnimatedStyle(() => {
    return {
      height: animated_height.value,
    };
  });

  useEffect(() => {
    if (props.selectorToggle) {
      animated_height.value = withTiming(170, { duration: 600 });
    } else {
      animated_height.value = withTiming(30, { duration: 600 });
    }
  }, [props.selectorToggle]);

  return (
    <View
      // onPress={handleToggle}
      style={{
        gap: 6,
      }}
      className={` items-center justify-center rounded-[20px] `}
    >
      <Animated.View
        style={[
          {
            gap: 6,
          },
          animated_style,
        ]}
        className={`flex-wrap flex-row justify-center items-center overflow-hidden `}
      >
        {title.map((item, index) => {
          return (
            <CategoryTile
              key={index}
              title={item}
              selected={props.selected === item}
              onPress={() => {
                props.setSelected(item);
                props.setSelectorToggle(false);
                props.handleSelectorToggle(index);
              }}
            />
          );
        })}
      </Animated.View>

      <Pressable
        onPress={() => {
          setToggle(!toggle);
          props.handleSelectorToggle(5);
          props.setSelectorToggle(!props.selectorToggle);
        }}
        style={{
          transform: [{ rotate: toggle ? "-90deg" : "90deg" }],
        }}
        className=" items-center justify-center p-4 mt-[-20px] rounded-full"
      >
        <Text
          style={[
            TextStyle.mdBold,
            {
              color: "#ffffff33",
            },
          ]}
        >
          {">"}
        </Text>
      </Pressable>
    </View>
  );
};

const CategoryTile = ({
  title,
  selected,
  onPress,
}: {
  title: string;
  selected: boolean;
  onPress: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={`px-2 py-1.5 rounded-[20px] items-center justify-center ${selected ? "bg-[#ffffff33]" : "bg-[#ffffff11]"}`}
    >
      <Text className="text-white">{title}</Text>
    </Pressable>
  );
};

export default CategorySelector;
