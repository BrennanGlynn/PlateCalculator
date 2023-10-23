import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import PlateVisualization from "./PlateVisualization";
import { StatusBar } from "expo-status-bar";
import { Input, Text } from "@rneui/themed";
import { useWeightPlateContext } from "../context/WeightPlateContext";

const PlateCalculator = () => {
  const [weight, setWeight] = useState("225");
  const [calculatedPlates, setCalculatedPlates] = useState([]);
  const { selectedWeights } = useWeightPlateContext();

  const plateWeights = selectedWeights;

  const calculateWeightPlatesPerSide = (totalWeight) => {
    // Define the weight of the barbell
    const barbellWeight = 45;

    // Subtract the weight of the barbell from the total weight
    totalWeight -= barbellWeight;

    // Initialize an empty object to store the plate count for each size per side
    const plateCountPerSide = {};

    // Sort the plate sizes in descending order
    plateWeights.sort((a, b) => b - a);

    // Iterate through each plate size and calculate the number of plates needed per side
    for (const plate of plateWeights) {
      if (totalWeight >= plate) {
        const numPlates = Math.floor(totalWeight / 2 / plate);
        plateCountPerSide[plate] = numPlates;
        totalWeight -= numPlates * plate * 2; // Multiply by 2 for both sides
      }
    }

    // Create an array to store the result with plates per side
    const result = [];

    // Iterate through the plate sizes and add the counts to the result array
    for (const plate of plateWeights) {
      if (plateCountPerSide[plate] > 0) {
        result.push({ size: plate, count: plateCountPerSide[plate] });
      }
    }

    return result;
  };

  useEffect(() => {
    // Calculate the plates per side
    const platesPerSide = calculateWeightPlatesPerSide(weight);
    setCalculatedPlates(platesPerSide);
  }, [weight, selectedWeights]);

  return (
    <View style={styles.container}>
      <Text h3 style={styles.heading}>
        Barbell Plate Calculator
      </Text>
      <View style={styles.inputRow}>
        <Input
          placeholder="Enter weight"
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
          label="Weight"
          value={weight}
          onChangeText={(text) => setWeight(text)}
          keyboardType="numeric"
        />
      </View>
      <Text style={styles.platesPerSideLabel} h4>
        Plates per side:
      </Text>

      <ScrollView>
        <PlateVisualization plates={calculatedPlates} />
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputRow: {
    flexDirection: "row",
  },
  input: { flex: 1, fontSize: 14, paddingVertical: 0 },
  inputContainer: { paddingHorizontal: 0 },
  heading: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  platesPerSideLabel: {
    fontSize: 24,
    fontWeight: "700",
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
});

export default PlateCalculator;
