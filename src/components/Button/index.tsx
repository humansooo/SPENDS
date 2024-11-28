import { Pressable, Text, TouchableHighlight } from "react-native";
import { GestureTouchEvent } from "react-native-gesture-handler";

import { BtnStyle } from "../../styles/ButtonStyles";
import { TextStyle } from "../../styles/TextStyle";

interface ButtonProps {
  text: string;
  onPress: () => void;
}

export const Button = ({ text, onPress }: ButtonProps) => {
  return (
    <TouchableHighlight style={BtnStyle.button} onPress={onPress}>
      <Text style={TextStyle.mdSemiBold}>{text}</Text>
    </TouchableHighlight>
  );
};
