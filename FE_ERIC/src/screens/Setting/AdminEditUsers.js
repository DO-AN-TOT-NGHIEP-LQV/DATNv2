import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Avatar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LoginImg } from "../../public/assets";

const AdminEditUsers = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatar, setAvatar] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("");

  const handleChooseAvatar = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.canceled === true) {
      return;
    }

    setAvatar(pickerResult.uri);
  };

  const handleSaveProfile = () => {
    // Lưu thông tin người dùng vào cơ sở dữ liệu
    // ...
  };

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size="xlarge"
        source={avatar ? { uri: avatar } : LoginImg}
        onPress={handleChooseAvatar}
        activeOpacity={0.7}
        containerStyle={styles.avatarContainer}
      />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        leftIcon={<Ionicons name="mail-outline" size={24} color="black" />}
        placeholder="Enter email"
      />
      <Input
        label="Name"
        value={name}
        onChangeText={setName}
        leftIcon={<Ionicons name="person-outline" size={24} color="black" />}
        placeholder="Enter name"
      />
      <Input
        label="Address"
        value={address}
        onChangeText={setAddress}
        leftIcon={<Ionicons name="location-outline" size={24} color="black" />}
        placeholder="Enter address"
      />
      <Input
        label="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        leftIcon={<Ionicons name="call-outline" size={24} color="black" />}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
      />
      <Input
        label="City"
        value={city}
        onChangeText={setCity}
        leftIcon={<Ionicons name="location-outline" size={24} color="black" />}
        placeholder="Enter city"
      />
      <Input
        label="Role"
        value={role}
        onChangeText={setRole}
        leftIcon={<Ionicons name="person-outline" size={24} color="black" />}
        placeholder="Enter role"
      />
      <Button title="Lưu thông tin " onPress={handleSaveProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    marginBottom: 20,
  },
});

export default AdminEditUsers;
