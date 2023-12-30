import { TextInput } from "react-native"
import { TextStyle } from "../../styles/TextStyle"

interface TextInputProps {
  onChangeText: (e: string) => void
  value: string
  placeholder: string
  style?: any
}

const TextField = (props: TextInputProps) => {

  return (
    <TextInput
      onChangeText={props.onChangeText}
      value={props.value}
      placeholder={props.placeholder}
      placeholderTextColor="#ffffff66"
      style={[TextStyle.md, {
        backgroundColor: '#303030',
        color: '#fff',
        padding: 20,
        borderRadius: 100,
      }, props.style]}
    />
  );
}

export default TextField;