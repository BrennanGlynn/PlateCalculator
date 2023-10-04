import React, { useEffect, useState } from "react";
import {
	Text,
	TextInput,
	View,
	Switch,
	ScrollView,
	StyleSheet,
} from "react-native";
import Constants from "expo-constants";
import PlateVisualization from "./PlateVisualization";
import { StatusBar } from "expo-status-bar";

const plateWeights = [45, 35, 25, 10, 5, 2.5, 1, 0.75, 0.5, 0.25];
const PlateCalculator = () => {
	const [weight, setWeight] = useState("225");
	const [isPounds, setIsPounds] = useState(true);
	const [calculatedPlates, setCalculatedPlates] = useState([]);

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
		<View
			style={{
				alignItems: "center",
				justifyContent: "space-between",
				marginBottom: 16,
			}}
		>
			<Text>Plate Calculator</Text>
			<Text style={{ marginRight: 8 }}>{isPounds ? "Pounds" : "Kilos"}</Text>
			<Switch value={isPounds} onValueChange={setIsPounds} />

			<Text>
				{weight} {isPounds ? "lbs" : "kgs"}
			</Text>
			<TextInput
				keyboardType="numeric"
				value={weight}
				onChangeText={setWeight}
				style={{ marginBottom: 16, borderWidth: 1, width: 100 }}
				autoFocus
			/>

			<Text style={styles.platesPerSideLabel}>Plates per side:</Text>

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
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-start",
		padding: "25px",
		marginTop: Constants.statusBarHeight,
	},
	platesPerSideLabel: {
		fontSize: 48,
		fontWeight: "700",
	},
	scrollView: {
		backgroundColor: "pink",
		marginHorizontal: 20,
	},
});

export default PlateCalculator;
