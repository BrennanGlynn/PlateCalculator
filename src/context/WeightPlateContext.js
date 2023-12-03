import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { readMaxWeightCountsFromStorage } from "../utility/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WeightPlateContext = createContext();

export const useWeightPlateContext = () => useContext(WeightPlateContext);

export const WeightPlateProvider = ({ children }) => {
  const defaultSelectedPlates = [0.25, 0.5, 0.75, 1, 2.5, 5, 10, 25, 45];
  const [selectedWeights, setSelectedWeights] = useState(defaultSelectedPlates);
  const [maxWeightCounts, setMaxWeightCounts] = React.useState({});

  const toggleWeightSelection = (weight) => {
    const uniquePlates = new Set(selectedWeights);
    uniquePlates.has(weight.size)
      ? uniquePlates.delete(weight.size)
      : uniquePlates.add(weight.size);
    const uniquePlatesArray = Array.from(uniquePlates);
    setSelectedWeights(uniquePlatesArray);
    storeSelectedWeights(uniquePlatesArray);
  };

  const getStoredMaxWeightCounts = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("maxWeightCounts");
      setMaxWeightCounts(jsonValue != null ? JSON.parse(jsonValue) : {});
    } catch (e) {
      console.error(e);
    }
  };

  const storeSelectedWeights = async (newSelectedWeights) => {
    try {
      await AsyncStorage.setItem(
        "selectedWeights",
        JSON.stringify(newSelectedWeights),
      );
    } catch (e) {
      // Maybe one day I'll actually log this
      console.error(e);
    }
  };

  const getStoredSelectedWeights = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("selectedWeights");
      setSelectedWeights(
        jsonValue != null ? JSON.parse(jsonValue) : defaultSelectedPlates,
      );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getStoredMaxWeightCounts();
    getStoredSelectedWeights();
  }, []);

  return (
    <WeightPlateContext.Provider
      value={{
        selectedWeights,
        toggleWeightSelection,
        maxWeightCounts,
        setMaxWeightCounts,
      }}
    >
      {children}
    </WeightPlateContext.Provider>
  );
};

WeightPlateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
