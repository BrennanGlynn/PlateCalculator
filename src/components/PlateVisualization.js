import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Svg, Circle, Text as SVGText } from "react-native-svg";
import PropTypes from "prop-types";
import removeLeadingZero from "../utility/removeLeadingZero";

const PlateVisualization = ({ plates }) => {
  return (
    <View style={styles.container}>
      {plates.map((plate, index) => (
        <View key={index} style={styles.plateGroup}>
          <Svg
            width={getPlateSize(plate.weight)}
            height={getPlateSize(plate.weight)}
          >
            <Circle
              cx={getPlateSize(plate.weight) / 2}
              cy={getPlateSize(plate.weight) / 2}
              r={getPlateSize(plate.weight) / 2 - 2}
              fill={getPlateColor(plate.weight)}
              stroke="gray"
              strokeWidth="0.5"
            />
            <Circle
              cx={getPlateSize(plate.weight) / 2}
              cy={getPlateSize(plate.weight) / 2}
              r={15}
              fill="white"
              stroke="#555"
              strokeWidth="2"
            />
            <SVGText
              x="25%"
              y="50%"
              fill={getPlateTextColor(plate.weight)}
              fontSize="16"
              fontWeight="bold"
              textAnchor="middle"
              dy=".3em"
            >
              {removeLeadingZero(plate.weight)}
            </SVGText>
            <SVGText
              x="75%"
              y="50%"
              fill={getPlateTextColor(plate.weight)}
              fontSize="16"
              fontWeight="bold"
              textAnchor="middle"
              dy=".3em"
            >
              {removeLeadingZero(plate.weight)}
            </SVGText>
          </Svg>
          <Text>
            {plate.count} x {plate.weight}
          </Text>
        </View>
      ))}
    </View>
  );
};

const getPlateColor = (weight) => {
  switch (weight) {
    case 45:
      return "#00266D";
    case 35:
      return "#017F26";
    case 25:
      return "#017F26";
    case 10:
      return "#FFF3DD";
    case 5:
      return "white";
    case 2.5:
      return "black";
    case 1:
      return "#9D222A";
    case 0.75:
      return "#007FD1";
    case 0.5:
      return "#00A12F";
    case 0.25:
      return "white";
    default:
      return "#ccc";
  }
};

const getPlateTextColor = (weight) => {
  switch (weight) {
    case 10:
      return "black";
    default:
      return "white";
  }
};

const getPlateSize = (weight) => {
  const baseSize = 100;
  return baseSize + Math.sqrt(weight) * 10;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 24,
  },
  plateGroup: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

PlateVisualization.propTypes = {
  plates: PropTypes.arrayOf(
    PropTypes.shape({
      weight: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default PlateVisualization;
