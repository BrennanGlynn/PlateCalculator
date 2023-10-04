import React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import PlateCalculator from "./components/PlateCalculator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <PlateCalculator />
    </View>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "25px",
    marginTop: Constants.statusBarHeight,
  },
});

export default App;
