import AsyncStorage from "@react-native-async-storage/async-storage";

export const removeLeadingZero = (num) => {
  return String(num).replace(/^0+/, "");
};

export const formatFloat = (float) => {
  return Math.round(float * 100) / 100;
};

export const readMaxWeightCountsFromStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("maxWeightCounts");
    return jsonValue != null ? JSON.parse(jsonValue) : {};
  } catch (e) {
    console.error(e);
  }
};
