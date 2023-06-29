import { Linking } from "react-native";
import { showError } from "../ultils/messageFunction";

const openWebLink = (url) => {
  if (!url || url.trim() == "") {
    showError("Liên kết rỗng");
    return;
  }

  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // console.log("Không thể mở liên kết");
        showError("Không thể mở liên kết");
      }
    })
    .catch((error) => {
      // console.log(error);
      showError("Không thể mở liên kết");
    });
};

export default openWebLink;
