import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import moment from "moment";
import { DELETE_SUB_DISCUSSION } from "../../../config/urls";
import { showError, showSuccess } from "../../../ultils/messageFunction";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import Color from "../../../constans/Color";
import Icons, { icons } from "../../Icons";
import { useSelector } from "react-redux";
import { apiDelete } from "../../../ultils/utilsApi";
import { hasAdminRole } from "../../../ultils/helperFunction";

const SubDiscussionSection = ({ subDisItem, mainDisId, handleEffect }) => {
  const detailUser = useSelector((state) => state.auth.detailUser);

  const deleteSubDis = async () => {
    await apiDelete(
      DELETE_SUB_DISCUSSION + `/${subDisItem.subId}`,
      {},
      {},
      true
    )
      .then((res) => {
        showSuccess("Xóa thành công");
      })
      .catch((error) => {
        showError(error.error_message);
      });
    await handleEffect();
  };

  return (
    <View
      style={{
        flexDirection: "row",
        paddingTop: 5,
        borderColor: Color.textLight,
        borderTopWidth: 1,
        borderColor: Color.textLight,
      }}
    >
      <Image
        source={{
          uri:
            subDisItem?.subUserAvatar ||
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAAB3CAMAAAB/s4FjAAAAIVBMVEX////f39/c3Nz09PT8/Pzk5OT4+Pjr6+vn5+fv7+/h4uE/taJXAAACkklEQVR4nO2bi5KDIAxFCwYU/v+Dt49tl62CdyqPayfnC85kQhIwXi6KoiiKoiiKoihfj8jkRWS0BowE54w11troljCdQTyYN9w15KOlishs352vMY+B2XpeGf8y01r7dZSfwXZ+tFyGjcz4sw6j7bYQH/PKV+l5tOAabwpRJpV2ZWPG9Jh2onxnGm35nwVQNma05T+keP5eUKW0h5RNZOotE+ZMdQyxdDZmGS2agFSNe6BHiyagzkSVIz8dvcNzCKGOcs8NnrZyRufssE/sjJY6dT4Gnhs8dyz4DBLV5zM6C6pM5HwBjanuhOghZJpFwZmf6kaIFmiiiwpeN3iG/q92JiocuDNPPsP3FDfaNAF1Zqp1oDLPCbyUn8sTmNog2AepnpHARkhUNW4g0yhRcX4g+5FeuMJ8Y+ccRqY696R8Dolu3Anq3Iny5zael42UUDyEfEXjRnG6Y5roUkolmq2fPCl9veJM55IzXdt+cUrn/KIM1xSaUMhn1nQudUJa5/wQTTbtJ+Q3ItS5KvnNE9p8zjvz1rpCnGl7ymorN4Fz5N/5qLLwpbRMe48F1lHFWvyCLKtZR3MU/RzhN/M4EwTbB2wdMGEem9l+3lvH3Yz2Mi7Y3n0g/CCO+aXCw5smm7Hu/34nHj53WWvT94eKaX9FG7F23awlfHLwtq1N6FFEpDRVfELzn1c8vC6FY5uOIr5KGm/Q7J+b6fNyvItt81fWoXIM0GAfBfzUyiQNbuwfofqjXqvTlxLrKkvzzDDVvxN1ca68d1C7+W1TN6EbtL8NXNXKcUJn6VE21LmXc9VO2Mm56ro/vkh+jJrO+A9Vx6jZCNGd7KPUbITq3Me5w/R8o+oE3f6S8qDmZkqfcQN1/gFCLxrMgS3bNQAAAABJRU5ErkJggg==",
        }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
        }}
      />

      {/*  Sub Dis */}
      <View
        style={{
          flex: 1,
          marginLeft: 5,
          borderColor: Color.textLight,
        }}
      >
        {/* Name */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text
            style={{ fontSize: 14, fontWeight: 500, flex: 1 }}
            numberOfLines={1}
          >
            {subDisItem?.subUsername || "Người dùng"}
          </Text>
          {/* 
          <Text
            style={{
              fontWeight: "300",
              fontSize: 12,
              // width: 90,
              alignSelf: "flex-start",
            }}
          >
            {moment(subDisItem.subUpdateAt).format("YYYY-MM-DD HH:mm")}
          </Text> */}

          {/* Menu Delete Of Sub */}
          {(detailUser.id == subDisItem.subUserId ||
            hasAdminRole(detailUser?.roles)) && (
            <Menu>
              <MenuTrigger>
                <Icons
                  size={20}
                  name={"more-vertical"}
                  icon={icons.Feather}
                  style={{ marginRight: 8 }}
                />
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={{ width: 100 }}
                customStyles={{
                  optionWrapper: {
                    paddingTop: 10,
                    paddingHorizontal: 10,
                  },
                }}
              >
                <MenuOption
                  onSelect={() => {
                    Alert.alert(
                      "Xóa",
                      "Bạn có chắc muốn xóa phần bình luận này",
                      [{ text: "Yes", onPress: deleteSubDis }, { text: "No" }],
                      { cancelable: true }
                    );
                  }}
                >
                  <Text style={{ color: "red" }}>Xóa</Text>
                </MenuOption>
                {/* <MenuOption
                  onSelect={() => alert(`Not called`)}
                  disabled={true}
                  text="Sửa //TODO"
                /> */}
              </MenuOptions>
            </Menu>
          )}
        </View>

        {/* Main Discussion */}
        <Text style={{ fontSize: 14, fontWeight: 400 }}>
          {subDisItem?.subContent}
        </Text>

        {/* Discussion  Option*/}
        <View
          style={{
            flexDirection: "row",
            marginTop: 0,
            borderColor: Color.textLight,
          }}
        >
          {/* Date */}
          <Text
            style={{
              flex: 1,
              textAlign: "right",
              fontWeight: "300",
              fontSize: 11,
            }}
          >
            {moment(subDisItem.subUpdateAt).format("YYYY-MM-DD HH:mm")}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SubDiscussionSection;

const styles = StyleSheet.create({});
