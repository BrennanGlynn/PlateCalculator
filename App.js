import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/screens/Home";
import { ThemeProvider } from "@rneui/themed";
import { Icon } from "@rneui/themed";
import Settings from "./src/screens/Settings";
import PlateSelector from "./src/screens/PlateSelector";
import { WeightPlateProvider } from "./src/context/WeightPlateContext";
// import theme from "./src/Theme";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <WeightPlateProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={({ navigation }) => ({
                headerRight: () => (
                  <Icon
                    name="settings-outline"
                    type="ionicon"
                    color="black"
                    onPress={() => navigation.navigate("Settings")}
                  />
                ),
              })}
            />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="PlateSelector" component={PlateSelector} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </WeightPlateProvider>
  );
};

export default App;
