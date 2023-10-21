import { Platform } from "react-native";
import { createTheme } from "@rneui/themed";
import { darkColors, lightColors } from "@rneui/base";

const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
  },
  darkColors: {
    ...Platform.select({
      default: darkColors.platform.android,
      ios: darkColors.platform.ios,
    }),
  },
  mode: "light",
});

export default theme;
