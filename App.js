import React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import PlateCalculator from "./components/PlateCalculator";

export default function App() {
	return (
		<View style={styles.container}>
			<PlateCalculator />
		</View>
	);
}

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
