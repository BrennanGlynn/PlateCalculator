import { Button, Text } from "@rneui/themed";
import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const Settings = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading} h2>
        Settings
      </Text>
      <Button
        title="Choose Available Plates"
        onPress={() => navigation.navigate("PlateSelector")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  heading: {
    marginBottom: 24,
  },
});

Settings.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Settings;
