import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

const InputFieldCustom = ({
  label,
  value,
  placeholder,
  onChangeText,
  fieldButtonLabel,
  fieldButtonFunction,
  styleView,
  isSecure = false,
  icon,
  ...props
}) => {
  return (
    <View
      // className = 'pb-1 mb-[25px] flex-row border-y-[#ccc]'
      style={[styles.styleView, styleView]}
    >
      {icon}
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor="gray"
        isSecure={isSecure}
        className="flex-[1] py-0  "
        {...props}
      />

      {!fieldButtonLabel ? (
        <TouchableOpacity onPress={fieldButtonFunction}>
          <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
            {fieldButtonLabel}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default InputFieldCustom;

const styles = StyleSheet.create({
  styleView: {
    paddingBottom: 4,
    borderBottomWidth: 1,
    marginBottom: 25,
    flexDirection: "row",
    borderTopColor: "#ccc",
  },
});
