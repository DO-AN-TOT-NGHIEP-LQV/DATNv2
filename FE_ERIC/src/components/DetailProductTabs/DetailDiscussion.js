import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Color from "../../constans/Color";
import { apiGet } from "../../ultils/utilsApi";
import { GET_PRODUCT_DISCUSSION } from "../../config/urls";
import { showError } from "../../ultils/messageFunction";

import DiscussionTextInput from "./DetailDiscussion/DiscussionTextInput";
import MainDiscussionSection from "./DetailDiscussion/MainDiscussionSection";

const DetailDiscussion = ({ dataProduct, effectMainTriggered }) => {
  const [listDiscussion, setListDiscussion] = useState([]);

  const [effectTriggered, setEffectTriggered] = useState(false);

  const handleEffect = () => {
    setEffectTriggered((prevState) => !prevState);
  };

  useEffect(() => {
    fetchData();
  }, [effectTriggered, dataProduct, effectMainTriggered]);

  // useEffect(() => {
  //   fetchData();
  // }, [effectTriggered]);

  const fetchData = async () => {
    var headers = {
      "Content-Type": "application/json",
    };

    var data = {
      params: {
        productId: dataProduct?.id,
      },
    };
    await apiGet(GET_PRODUCT_DISCUSSION, data, headers, true)
      .then((res) => {
        setListDiscussion(res.data);
        console.log("GET_PRODUCT_DISCUSSION");
      })
      .catch((error) => {
        showError(error.error_message);
      });
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* Input Comment Footer */}
      <DiscussionTextInput
        productId={dataProduct?.id}
        placeholder={"Hãy để lại gì đó"}
        handleEffect={handleEffect}
      />

      {/* Discussions Main Comment */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={listDiscussion}
          keyExtractor={(item, index) => `myKey-${item.mainId}`}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingBottom: 5,
          }}
          renderItem={({ item, index }) => {
            return (
              <MainDiscussionSection
                mainDisItem={item}
                handleEffect={handleEffect}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default DetailDiscussion;

const styles = StyleSheet.create({
  inputTextDiscussionStyle: {
    flexDirection: "row",
    backgroundColor: Color.white,
    height: 80,
    paddingHorizontal: 10,
    // paddingVertical: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: Color.textLight,
  },
});
