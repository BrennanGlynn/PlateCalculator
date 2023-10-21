import { Button, Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

const Settings = ({ navigation }) => {
  return (
    <View>
      <Text h2>Settings</Text>
      <Button
        title="Choose Available Plates"
        onPress={() => alert("choose plates")}
      />
    </View>
  );
};

Settings.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Settings;
