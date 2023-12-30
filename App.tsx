import StackNav from './src/Navigators/StackNav';
import "react-native-gesture-handler";
import {
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_600SemiBold,
  Montserrat_300Light,
  useFonts
} from '@expo-google-fonts/montserrat';
import StoreProvider from './src/redux/StoreProvider';

export default function App() {

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_600SemiBold,
    Montserrat_300Light
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <StoreProvider>
    <StackNav />
    </StoreProvider>
  );
}