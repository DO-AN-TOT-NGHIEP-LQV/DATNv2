import {
  StyleSheet,
  Text,
  View,
  Modal,
  Animated,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import React from "react";
import InputModal from "../InputModal";
import { Color } from "../../constans";
import Icons, { icons } from "../Icons";
import { SIZES } from "../../constans/Theme";
import { useState } from "react";

const windowHeight = Dimensions.get("window").height;

const ModalInputText = ({
  isVisible,
  onClose,
  label,
  value,
  onPress,
  maxLength = 224,
  children,
  textInputStyle,
}) => {
  const [text, setText] = useState(value);

  const handleChangeText = (value) => {
    if (value.length <= maxLength) {
      setText(value);
    }
  };

  const onPressSaveState = () => {
    onPress(text);
    onClose();
  };

  return (
    <InputModal
      isVisible={isVisible}
      label={label}
      onClose={onClose}
      onPress={onPressSaveState}
    >
      <View>
        <TextInput
          style={{ ...styles.textInput, ...textInputStyle }}
          placeholder={label}
          value={text}
          multiline={true}
          numberOfLines={5}
          autoCorrect={true}
          onChangeText={handleChangeText}
          maxLength={maxLength}
        />

        {text && (
          <Text style={{ alignSelf: "flex-end" }}>
            {text.length}/{maxLength}
          </Text>
        )}

        {children}
      </View>
    </InputModal>
  );
};

export default ModalInputText;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: Color.white,
    borderRadius: SIZES.radius,
    borderWidth: 0,
    color: "#14171A",
    fontSize: 16,
    height: 120,
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
