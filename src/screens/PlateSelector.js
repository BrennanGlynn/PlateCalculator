import { CheckBox, Text } from "@rneui/themed";
import React from "react";
import { View, StyleSheet } from "react-native";
import { useWeightPlateContext } from "../context/WeightPlateContext";
import { WEIGHT_PLATES } from "../constants/WEIGHT_PLATES";

const PlateSelector = () => {
  const { selectedWeights, toggleWeightSelection } = useWeightPlateContext();

  // Descending sort based on size
  const sortedPlates = Object.keys(WEIGHT_PLATES)
    .map((plateKey) => WEIGHT_PLATES[plateKey])
    .sort((a, b) => b.size - a.size);

  return (
    <View style={styles.container}>
      <Text>Select Weight Plates:</Text>
      {sortedPlates.map((weight) => {
        return (
          <CheckBox
            key={weight.size}
            title={weight.size}
            checked={selectedWeights.includes(weight.size)}
            onPress={() => toggleWeightSelection(weight)}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

export default PlateSelector;
