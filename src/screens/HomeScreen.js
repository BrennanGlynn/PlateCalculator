import React from "react";
import { View } from "react-native";
import PlateCalculator from "../components/PlateCalculator";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";

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

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <PlateCalculator />
    </View>
  );
};

export default HomeScreen;
