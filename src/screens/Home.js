import React from "react";
import { View } from "react-native";
import PlateCalculator from "../components/PlateCalculator";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

const Home = () => {
  return (
    <View style={styles.container}>
      <PlateCalculator />
    </View>
  );
};

export default Home;
