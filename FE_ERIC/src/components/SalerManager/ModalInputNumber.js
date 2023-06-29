import { StyleSheet, TextInput, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import InputModal from "../InputModal";
import { SIZES } from "../../constans/Theme";
import { Color } from "../../constans";
import { showMessage } from "react-native-flash-message";

const ModalInputNumber = ({
  isVisible,
  onClose,
  label,
  value,
  onPress,
  numberOfLines,
  isInteger,
}) => {
  const [valueNumber, setValueNumber] = useState();

  useEffect(() => {
    if (typeof value === "number") {
      setValueNumber(value.toString());
    } else {
      setValueNumber(value);
    }
  }, []);

  const onPressSaveState = () => {
    const floatValue = parseFloat(valueNumber);
    if (!isNaN(floatValue)) {
      onPress(floatValue);
      onClose();
    }
  };

  function renderFloatInput() {
    const handleNumber = (e) => {
      if (e.match(/^([0-9]{1,})?(\.)?([0-9]{1,3})?$/)) setValueNumber(e);
    };

    return (
      <View>
        <TextInput
          style={styles.textInput}
          value={valueNumber}
          onChangeText={(value) => handleNumber(value)}
          numberOfLines={1}
        />
      </View>
    );
  }

  function renderIntegerInput() {
    const handleInputChange = (text) => {
      const formattedText = text.replace(/[^0-9]/g, "");
      setValueNumber(formattedText);
    };
    return (
      <View>
        <TextInput
          style={{ ...styles.textInput, height: 60 }}
          value={valueNumber}
          onChangeText={handleInputChange}
          keyboardType="numeric"
        />
      </View>
    );
  }

  return (
    <InputModal
      isVisible={isVisible}
      label={label}
      onClose={onClose}
      onPress={onPressSaveState}
    >
      <View>{isInteger ? renderIntegerInput() : renderFloatInput()}</View>
    </InputModal>
  );
};

export default ModalInputNumber;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: Color.white,
    borderRadius: SIZES.radius,
    borderWidth: 0,
    color: "#14171A",
    fontSize: 16,
    height: 100,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    textAlignVertical: "top",
    borderColor: "#E1E8ED",
    borderWidth: 2,
  },
});
