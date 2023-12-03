import {
  Badge,
  Button,
  CheckBox,
  Dialog,
  Input,
  ListItem,
  Text,
  makeStyles,
  useTheme,
} from "@rneui/themed";
import React from "react";
import { View, ScrollView } from "react-native";
import { useWeightPlateContext } from "../context/WeightPlateContext";
import { WEIGHT_PLATES } from "../constants/WEIGHT_PLATES";
import { Icon } from "@rneui/base";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { DEFAULT_MAX_COUNT } from "../constants/defaults";

const PlateSelector = () => {
  const {
    selectedWeights,
    toggleWeightSelection,
    maxWeightCounts,
    setMaxWeightCounts,
  } = useWeightPlateContext();

  const { theme } = useTheme();
  const styles = useStyles(theme);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState(null);

  const handleMaxWeightCountChange = (weight, count) => {
    const isInteger = /^\d+$/.test(count);

    if (count === "") {
      resetWeights(weight);
      return;
    }

    if (isInteger) {
      setMaxWeightCounts({
        ...maxWeightCounts,
        [weight.size]: parseInt(count),
      });
    }
  };

  const resetWeights = (weight) => {
    const newMaxWeightCounts = { ...maxWeightCounts };
    delete newMaxWeightCounts[weight.size];
    setMaxWeightCounts(newMaxWeightCounts);
  };
  // Descending sort based on size
  const sortedPlates = Object.keys(WEIGHT_PLATES)
    .map((plateKey) => WEIGHT_PLATES[plateKey])
    .sort((a, b) => b.size - a.size);

  const setActiveDialog = (weight) => {
    setIsDialogOpen(true);
    setSelectedWeight(weight);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Select Weight Plates</Text>
      {sortedPlates.map((weight) => {
        const isDisabled = !selectedWeights.includes(weight.size);
        const currentSetMax = maxWeightCounts[weight.size];
        return (
          <ListItem key={weight.size} bottomDivider>
            <View style={styles.listItem}>
              <CheckBox
                key={weight.size}
                title={weight.size}
                checked={selectedWeights.includes(weight.size)}
                onPress={() => toggleWeightSelection(weight)}
              />
              <TouchableOpacity
                onPress={() => setActiveDialog(weight)}
                disabled={isDisabled}
                style={{ position: "relative" }}
              >
                <View style={{ padding: 12 }}>
                  <Icon
                    name="settings-outline"
                    type="ionicon"
                    iconStyle={isDisabled ? { opacity: 0.4 } : {}}
                  />
                  {currentSetMax && (
                    <Badge
                      value={currentSetMax}
                      status="error"
                      containerStyle={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                      }}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </ListItem>
        );
      })}
      <MaxPlateDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        handleMaxWeightCountChange={handleMaxWeightCountChange}
        selectedWeight={selectedWeight}
        resetWeights={resetWeights}
      />
    </ScrollView>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
  },
  listItem: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  checkboxContainer: {
    width: 48,
    backgroundColor: theme.colors.success,
    borderWidth: 1,
  },

  buttonContainer: {
    flex: 1,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButton: {
    width: 48,
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 48 / 2,
  },
}));

export default PlateSelector;

const MaxPlateDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  handleMaxWeightCountChange,
  selectedWeight,
  resetWeights,
}) => {
  const styles = useDialogStyles();
  const { maxWeightCounts } = useWeightPlateContext();

  const dialogInputRef = React.createRef();

  useEffect(() => {
    if (dialogInputRef.current) {
      dialogInputRef.current.focus();
    }
  }, [isDialogOpen]);

  const currentMaxCount = maxWeightCounts[selectedWeight?.size] || null;

  return (
    <Dialog isVisible={isDialogOpen} onPressOut={() => setIsDialogOpen(false)}>
      <View style={{ position: "absolute", top: 8, right: 8 }}>
        <TouchableOpacity onPress={() => setIsDialogOpen(false)}>
          <Icon
            name="close-outline"
            type="ionicon"
            style={{ fontSize: 48 }}
            iconProps={{ style: { fontSize: 32 } }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.dialogTitleContainer}>
        <Text style={styles.dialogTitle}>
          Set Max Amount of{" "}
          <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>
            {selectedWeight?.size}
          </Text>
          &apos;s
        </Text>
        <Text>
          If this is left empty, the calculator will use the default max of{" "}
          {DEFAULT_MAX_COUNT}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Enter a number"
          ref={dialogInputRef}
          value={currentMaxCount ? currentMaxCount.toString() : ""}
          keyboardType="numeric"
          onChangeText={(text) =>
            handleMaxWeightCountChange(selectedWeight, text)
          }
        />
      </View>
      <View style={styles.dialogActionButtons}>
        <Button
          title="Clear"
          buttonStyle={{
            backgroundColor: "rgba(214, 61, 57, 1)",
            width: 100,
          }}
          onPress={() => resetWeights(selectedWeight)}
        />
      </View>
    </Dialog>
  );
};

MaxPlateDialog.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired,
  setIsDialogOpen: PropTypes.func.isRequired,
  handleMaxWeightCountChange: PropTypes.func.isRequired,
  selectedWeight: PropTypes.shape({
    size: PropTypes.number.isRequired,
  }),
  resetWeights: PropTypes.func.isRequired,
};

const useDialogStyles = makeStyles(() => ({
  dialogTitleContainer: {
    marginTop: 4,
  },
  dialogTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  dialogActionButtons: {
    alignItems: "center",
  },
}));
