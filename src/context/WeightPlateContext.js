import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const WeightPlateContext = createContext();

export const useWeightPlateContext = () => useContext(WeightPlateContext);

export const WeightPlateProvider = ({ children }) => {
  const [selectedWeights, setSelectedWeights] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 9,
  ]);

  const toggleWeightSelection = (weight) => {
    const uniquePlates = new Set(selectedWeights);
    uniquePlates.has(weight.id)
      ? uniquePlates.delete(weight.id)
      : uniquePlates.add(weight.id);
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
