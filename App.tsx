import "expo-dev-client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Notification from "./screens/Notification";
import Biometrics from "./screens/Biometrics";
import Home from "./screens/Home";
import Blur from "./screens/Blur";

export type RootStack = {
  Home: undefined;
  Notification: undefined;
  Biometrics: undefined;
  Blur: undefined;
};

const Stack = createNativeStackNavigator<RootStack>();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Notification' component={Notification} />
        <Stack.Screen name='Biometrics' component={Biometrics} />
        <Stack.Screen name='Blur' component={Blur} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return <AppNavigator />;
}
