// PlateVisualization.js

import React from "react";
import { StyleSheet, View, Text } from "react-native";

const PlateVisualization = ({ plates }) => {
  return (
    <View style={styles.container}>
      {plates.map((plate, index) => (
        <View key={index} style={styles.plateGroup}>
          <View
            style={{
              ...styles.plate,
              backgroundColor: getPlateColor(plate.weight),
              width: getPlateSize(plate.weight),
              height: getPlateSize(plate.weight),
            }}
          ></View>
          <Text>
            {plate.count} x {plate.weight}
          </Text>
        </View>
      ))}
    </View>
  );
};

// Get plate color based on weight
const getPlateColor = (weight) => {
  switch (weight) {
    case 45:
      return "blue";
    case 35:
      return "black";
    case 25:
      return "green";
    case 10:
      return "white";
    case 5:
      return "lightblue";
    case 2.5:
      return "green";
    case 1:
      return "red";
    case 0.75:
      return "blue";
    case 0.5:
      return "green";
    case 0.25:
      return "white";
    default:
      return "black";
  }
};

const getPlateSize = (weight) => {
  // Use a base size plus the square root of the weight for scaling
  const baseSize = 20; // You can adjust this to control the minimum size
  return baseSize + Math.sqrt(weight) * 10; // The factor 10 can be adjusted as well
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 20,
  },
  plateGroup: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  plate: {
    borderRadius: 100,
    marginBottom: 8,
    borderColor: "gray",
    borderWidth: 0.5,
  },
});

export default PlateVisualization;
