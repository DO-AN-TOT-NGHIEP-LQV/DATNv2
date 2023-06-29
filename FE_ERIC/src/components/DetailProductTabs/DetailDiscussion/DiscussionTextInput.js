import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Icons, { icons } from "../../Icons";
import Color from "../../../constans/Color";
import { checkStringEmpty } from "../../../ultils/validations";
import { apiPost } from "../../../ultils/utilsApi";
import {
  CREATE_NEW_DISCUSSION,
  CREATE_NEW_SUB_DISCUSSION,
} from "../../../config/urls";
import { showError } from "../../../ultils/messageFunction";
import { useState } from "react";

const DiscussionTextInput = ({
  handleEffect,
  placeholder,
  inputTextDiscussionStyle,
  productId,
  mainDiscussionId,
}) => {
  const [discussionValue, setDiscussionValue] = useState("");

  const saveDiscussion = async () => {
    if (!checkStringEmpty(discussionValue)) {
      if (
        mainDiscussionId == undefined &&
        productId != undefined &&
        productId != ""
      ) {
        await saveMainDiscussion(productId);
        await handleEffect();
        setDiscussionValue("");
      } else if (mainDiscussionId != undefined && mainDiscussionId != null) {
        await saveSubDiscussion(mainDiscussionId);
        await handleEffect();
        setDiscussionValue("");
      }
    }
  };

  const saveMainDiscussion = async (productIds) => {
    const data = {
      productId: productIds,
      mainContent: discussionValue,
    };

    const a = await apiPost(CREATE_NEW_DISCUSSION, data, {}, true)
      .then((res) => {
        console.log(CREATE_NEW_DISCUSSION);
      })
      .catch((error) => {
        showError(error.error_message);
      });
  };

  const saveSubDiscussion = async (mainDiscussionId) => {
    const data = {
      mainDisId: mainDiscussionId,
      subContent: discussionValue,
    };

    const a = await apiPost(CREATE_NEW_SUB_DISCUSSION, data, {}, true)
      .then((res) => {
        console.log(CREATE_NEW_SUB_DISCUSSION);
      })
      .catch((error) => {
        showError(error.error_message);
      });
  };

  return (
    <View
      style={{
        ...styles.inputTextDiscussionStyle,
        ...inputTextDiscussionStyle,
      }}
    >
      <TextInput
        style={{ flex: 1 }}
        multiline
        placeholder={placeholder}
        placeholderTextColor={Color.mainColor}
        value={discussionValue}
        onChangeText={setDiscussionValue}
      />
      {/* <TouchableWithoutFeedback */}
      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          saveDiscussion();
        }}
      >
        <Icons
          icon={icons.Ionicons}
          color={Color.mainColor}
          name={"ios-send"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DiscussionTextInput;

const styles = StyleSheet.create({
  inputTextDiscussionStyle: {
    flexDirection: "row",
    backgroundColor: Color.white,
    height: 80,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: Color.textLight,
  },
});
