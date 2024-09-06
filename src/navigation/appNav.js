import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home";
import MovieDetail from "../screens/movieDetail";

const Stack = createNativeStackNavigator();

export default function AppNav() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen  name="Details" component={MovieDetail}   />
    </Stack.Navigator>
  );
}