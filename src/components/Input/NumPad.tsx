import { Text, TouchableHighlight, Vibration, View } from "react-native";

import { TextStyle } from "../../styles/TextStyle";
import { addCommaToNumber } from "../../utils";

interface props {
  value: string;
  setValue: (value: string) => void;
  open: boolean;
}

const NumPad = (data: props) => {
  return (
    <View
      style={{
        gap: 12,
        paddingHorizontal: 20,
        zIndex: -10,
      }}
      className="flex flex-row flex-wrap justify-center"
    >
      <View className=" items-center justify-center flex-row rounded-[50px]">
        <Text style={[TextStyle.mdBold, { color: "#404040" }]}>₹ </Text>
        <Text
          style={[TextStyle.xlBold, { color: "#fafafa", paddingRight: 20 }]}
        >
          {addCommaToNumber(Number(data.value)) || (
            <Text style={[TextStyle.xlBold, { color: "#999999" }]}>0</Text>
          )}
        </Text>
      </View>

      <View
        style={{
          gap: 12,
          // padding: 20,
        }}
        className="flex flex-row flex-wrap justify-center"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => {
          return (
            <NumPadItem
              key={number}
              onPress={() => {
                if (data.value.length > 6) return;
                data.setValue(data.value + number);
                Vibration.vibrate(25);
              }}
              number={number}
            />
          );
        })}
        <TouchableHighlight
          onPress={() => {
            data.setValue(data.value.slice(0, -1));
            Vibration.vibrate(35);
          }}
          onLongPress={() => {
            data.setValue("");
            Vibration.vibrate(50);
          }}
          className=" w-20 h-20 bg-[#242424] rounded-full items-center justify-center"
        >
          <Text style={[TextStyle.md, { color: "#ffffff" }]}>DEL</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const NumPadItem = ({ onPress, number }: any) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={{
        marginLeft: number === 0 ? 92 : 0,
      }}
      className=" w-20 h-20 border border-[#343434] rounded-full items-center justify-center"
    >
      <Text style={[TextStyle.md, { color: "#ffffff" }]}>{number}</Text>
    </TouchableHighlight>
  );
};

export default NumPad;
