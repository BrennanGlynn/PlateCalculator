import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Svg, Circle, Text as SVGText } from "react-native-svg";
import PropTypes from "prop-types";
import { removeLeadingZero } from "../utility/utils";
import { WEIGHT_PLATES } from "../constants/WEIGHT_PLATES";

const PlateVisualization = ({ plates }) => {
  return (
    <View style={styles.container}>
      {plates.map((plate, index) => {
        return (
          <View key={index} style={styles.plateGroup}>
            <Svg
              width={calculatePlateSize(plate.size)}
              height={calculatePlateSize(plate.size)}
            >
              <Circle
                cx={calculatePlateSize(plate.size) / 2}
                cy={calculatePlateSize(plate.size) / 2}
                r={calculatePlateSize(plate.size) / 2 - 2}
                fill={WEIGHT_PLATES[plate.size].color}
                stroke="gray"
                strokeWidth="0.5"
              />
              <Circle
                cx={calculatePlateSize(plate.size) / 2}
                cy={calculatePlateSize(plate.size) / 2}
                r={15}
                fill="white"
                stroke="#555"
                strokeWidth="2"
              />
              <SVGText
                x="20%"
                y="50%"
                fill={getPlateTextColor(plate.size)}
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
                dy=".3em"
              >
                {removeLeadingZero(plate.size)}
              </SVGText>
              <SVGText
                x="80%"
                y="50%"
                fill={getPlateTextColor(plate.size)}
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
                dy=".3em"
              >
                {removeLeadingZero(plate.size)}
              </SVGText>
            </Svg>
            <Text>
              {plate.count} x {plate.size}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const getPlateTextColor = (size) => {
  const plateColor = WEIGHT_PLATES[size].color;
  const luminance =
    (0.299 * parseInt(plateColor.substring(1, 3), 16) +
      0.587 * parseInt(plateColor.substring(3, 5), 16) +
      0.114 * parseInt(plateColor.substring(5, 7), 16)) /
    255;

  return luminance > 0.5 ? "#000000" : "#FFFFFF";
};

const calculatePlateSize = (size) => {
  const baseSize = 100;
  return baseSize + Math.sqrt(size) * 10;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 12,
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
      size: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default PlateVisualization;
