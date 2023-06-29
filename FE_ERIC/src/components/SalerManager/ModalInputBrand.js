import {
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import React from "react";
import InputModal from "../InputModal";
import { Color } from "../../constans";
import { SIZES } from "../../constans/Theme";
import { useState } from "react";
import { suggestions } from "../../constans/raw";

const ModalInputBrand = ({
  isVisible,
  onClose,
  label,
  value,
  onPress,
  maxLength = 20,
}) => {
  const [text, setText] = useState(value);
  const [suggesList, setSugesList] = useState([]);

  const onPressSaveState = () => {
    onPress(text);
    onClose();
  };

  const onChangeText = (text) => {
    setText(text);
    if (text === "") {
      setSugesList([]);
    }
    const regex = new RegExp(`^${text}`, "i");
    setSugesList(suggestions.filter((item) => item.value.match(regex)));
  };

  const selecteSuget = (item) => {
    setText(item.value);
  };

  return (
    <InputModal
      isVisible={isVisible}
      label={label}
      onClose={onClose}
      onPress={onPressSaveState}
      styleContainer={{
        height: 600,
      }}
    >
      <View>
        <TextInput
          style={{ ...styles.textInput }}
          placeholder={label}
          value={text}
          multiline={true}
          numberOfLines={5}
          autoCorrect={true}
          onChangeText={onChangeText}
          maxLength={maxLength}
        />

        <Text style={{ alignSelf: "flex-end", marginTop: -10 }}>
          {text?.length || 0}/{maxLength}
        </Text>

        <View style={{ height: 400 }}>
          {text && suggesList.length > 0 ? (
            <FlatList
              data={suggesList}
              style={{ height: 400 }}
              showsVerticalScrollIndicator={true}
              renderItem={({ item, index }) => (
                <Pressable
                  style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                  onPress={() => {
                    selecteSuget(item);
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 15,
                    }}
                  >
                    <View style={{ marginLeft: 10, flexShrink: 1 }}>
                      <Text style={{ fontWeight: "700" }}>{item.value}</Text>
                      <Text style={{ fontSize: 12 }}>{item.value}</Text>
                    </View>
                  </View>
                </Pressable>
              )}
              keyExtractor={(item, index) => item + index}
            />
          ) : null}
        </View>
      </View>
    </InputModal>
  );
};

export default ModalInputBrand;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: Color.white,
    borderRadius: SIZES.radius,
    borderWidth: 0,
    color: "#14171A",
    fontSize: 16,
    height: 50,
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
