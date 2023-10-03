import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, TextInput, View } from "react-native";
import PlateVisualization from "./components/PlateVisualization";

const plateWeights = [45, 35, 25, 10, 5, 2.5, 1, 0.75, 0.5, 0.25];
export default function App() {
  const [weight, setWeight] = useState("225");
  const [isPounds, setIsPounds] = useState(true);
  const [calculatedPlates, setCalculatedPlates] = useState([]);

  const calculateWeightPlatesPerSide = (totalWeight) => {
    // Define the weight of the barbell
    const barbellWeight = 45; // 45 pounds for a standard Olympic barbell

    // Subtract the weight of the barbell from the total weight
    totalWeight -= barbellWeight;

    // Define an array of standard weight plate sizes
    const plateWeights = [45, 35, 25, 10, 5, 2.5, 1, 0.75, 0.5, 0.25];

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
        result.push({ weight: plate, count: plateCountPerSide[plate] });
      }
    }

    return result;
  };

  useEffect(() => {
    // Calculate the plates per side
    const platesPerSide = calculateWeightPlatesPerSide(weight);
    setCalculatedPlates(platesPerSide);
  }, [weight]);

  return (
    <View style={styles.container}>
      <Text>Plate Calculator</Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Text style={{ marginRight: 8 }}>{isPounds ? "Pounds" : "Kilos"}</Text>
        <Switch value={isPounds} onValueChange={setIsPounds} />
      </View>
      <TextInput
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        style={{ marginBottom: 16, borderWidth: 1 }}
        autoFocus
      />
      <Text>
        {weight} {isPounds ? "lbs" : "kgs"}
      </Text>

      <Text>{JSON.stringify(calculatedPlates)}</Text>
      <PlateVisualization plates={calculatedPlates} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: "25px",
  },
});
