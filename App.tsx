import StackNav from "./src/navigators/StackNav";

import "react-native-gesture-handler";
import {
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_600SemiBold,
  Montserrat_300Light,
} from "@expo-google-fonts/montserrat";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_600SemiBold,
    Montserrat_300Light,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <StackNav />;
}
