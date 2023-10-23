import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const WeightPlateContext = createContext();

export const useWeightPlateContext = () => useContext(WeightPlateContext);

export const WeightPlateProvider = ({ children }) => {
  const defaultSelectedPlates = [0.25, 0.5, 0.75, 1, 2.5, 5, 10, 25, 45];
  const [selectedWeights, setSelectedWeights] = useState(defaultSelectedPlates);

  const toggleWeightSelection = (weight) => {
    const uniquePlates = new Set(selectedWeights);
    uniquePlates.has(weight.size)
      ? uniquePlates.delete(weight.size)
      : uniquePlates.add(weight.size);
    setSelectedWeights(Array.from(uniquePlates));
  };

  return (
    <WeightPlateContext.Provider
      value={{ selectedWeights, toggleWeightSelection }}
    >
      {children}
    </WeightPlateContext.Provider>
  );
};

WeightPlateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
