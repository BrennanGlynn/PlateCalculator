import { CheckBox, Text } from "@rneui/themed/dist";
import React from "react";
import { View, StyleSheet } from "react-native";
import { useWeightPlateContext } from "../context/WeightPlateContext";
import { availableWeights } from "../utility/availableWeights";

const PlateSelector = () => {
  const { selectedWeights, toggleWeightSelection } = useWeightPlateContext();

  // Descending sort based on size
  const sortedPlates = availableWeights.sort((a, b) => b.size - a.size);

  return (
    <View style={styles.container}>
      <Text>Select Weight Plates:</Text>
      {sortedPlates.map((weight) => (
        <CheckBox
          key={weight.id}
          title={weight.size}
          checked={selectedWeights.includes(weight.id)}
          onPress={() => toggleWeightSelection(weight)}
        />
      ))}
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
