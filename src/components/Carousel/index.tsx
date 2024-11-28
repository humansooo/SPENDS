import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { BtnStyle } from "../../styles/ButtonStyles";
import { TextStyle } from "../../styles/TextStyle";
import { Button } from "../Button";
import { BtnSide } from "../Icon";

interface HomeCarouselProps {
  selected: string;
  onChange: (selected: string) => void;
  data?: string[];
}

export const HomeCarousel = ({
  selected,
  onChange,
  data,
}: HomeCarouselProps) => {
  return (
    <View
      style={{
        position: "relative",
      }}
      className="pb-4"
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{
          gap: 4,
          paddingHorizontal: 8,
        }}
      >
        {data?.map((item, index) => (
          <Item
            selected={
              selected?.toLocaleLowerCase() === item.toLocaleLowerCase()
            }
            key={index}
            text={item}
            onPress={() => onChange(item)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

interface ItemProps {
  text: string;
  onPress: () => void;
  selected: boolean;
}

const Item = ({ text, onPress, selected }: ItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        BtnStyle.button,
        {
          backgroundColor: selected ? "#ffffff" : "#00000022",
          borderWidth: selected ? 0 : 1,
          position: "relative",
        },
      ]}
    >
      <View
        style={{
          display: selected ? "flex" : "none",
        }}
        className=" transform rotate-0 absolute left-2 "
      >
        <BtnSide />
      </View>
      <Text
        style={[
          selected ? TextStyle.smBold : TextStyle.sm,
          {
            color: selected ? "#000000" : "#ffffff99",
          },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
