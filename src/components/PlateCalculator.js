import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import PlateVisualization from "./PlateVisualization";
import { StatusBar } from "expo-status-bar";
import { Input, Text } from "@rneui/themed";
import { useWeightPlateContext } from "../context/WeightPlateContext";
import { formatFloat } from "../utility/utils";
import {
  DEFAULT_BARBELL_WEIGHT,
  DEFAULT_MAX_COUNT,
} from "../constants/defaults";

const PlateCalculator = () => {
  const [weight, setWeight] = useState("225");
  const [calculatedPlates, setCalculatedPlates] = useState({
    platesPerSide: [],
    leftoverWeight: 0,
  });
  const { selectedWeights, maxWeightCounts } = useWeightPlateContext();

  const plateWeights = selectedWeights;

  const calculateWeightPlatesPerSide = (totalWeight) => {
    // Define the weight of the barbell
    const barbellWeight = DEFAULT_BARBELL_WEIGHT;

    // Subtract the weight of the barbell from the total weight
    totalWeight -= barbellWeight;

    // Initialize an empty object to store the plate count for each size per side
    const plateCountPerSide = {};

    // Sort the plate sizes in descending order
    plateWeights.sort((a, b) => b - a);

    // Iterate through each plate size and calculate the number of plates needed per side
    for (const plate of plateWeights) {
      if (totalWeight >= plate) {
        // Get the maximum number of plates allowed for the current plate size
        const maxPlates =
          maxWeightCounts[plate] || maxWeightCounts[plate] === 0
            ? maxWeightCounts[plate] // If the max weight count is defined for the plate size, use it
            : DEFAULT_MAX_COUNT; // Otherwise, use the default maximum
        const numPlates = Math.min(
          maxPlates,
          Math.floor(totalWeight / 2 / plate),
        );
        plateCountPerSide[plate] = numPlates;
        totalWeight -= numPlates * plate * 2; // Multiply by 2 for both sides
      }
    }

    // Create an array to store the result with plates per side
    const result = [];

    // Iterate through the plate sizes and add the counts to the result array
    for (const plate of plateWeights) {
      if (plateCountPerSide[plate] > 0) {
        result.push({
          size: plate,
          count: plateCountPerSide[plate],
        });
      }
    }

    return { platesPerSide: result, leftoverWeight: totalWeight };
  };

  const checkForLeftoverWeight = () => {
    const { leftoverWeight } = calculatedPlates;
    const totalDisplayedWeight = formatFloat(weight - leftoverWeight);
    if (leftoverWeight > 0) {
      alert(
        `Error: The plates shown only weigh ${totalDisplayedWeight} pounds. They are missing ${formatFloat(
          leftoverWeight,
        )} pounds from your target weight. Try adjusting your selected plates.`,
      );
    }
  };

  useEffect(() => {
    // Calculate the plates per side
    const calculatedResult = calculateWeightPlatesPerSide(weight);
    setCalculatedPlates(calculatedResult);
  }, [weight, selectedWeights, maxWeightCounts]);

  const showingVal =
    weight <= DEFAULT_BARBELL_WEIGHT
      ? 0
      : formatFloat(weight - calculatedPlates.leftoverWeight);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headingContainer}>
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
              onBlur={checkForLeftoverWeight}
            />
          </View>
          <Text style={styles.platesPerSideLabel} h4>
            Plates per side:
          </Text>
          <Text style={styles.displayedWeightLabel} h5>
            Showing {showingVal} pounds
          </Text>
        </View>

        <PlateVisualization
          plates={calculatedPlates.platesPerSide}
          leftoverWeight={calculatedPlates.leftoverWeight}
        />
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
  headingContainer: {
    padding: 24,
  },
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
  displayedWeightLabel: {
    color: "gray",
  },
});

export default PlateCalculator;
