// //import liraries
// import React from "react";
// import {
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// // create a component
// const ButtonWithLoader = ({ isLoading, text, onPress }) => {
//   return (
//     <TouchableOpacity
//       mode="contained"
//       onPress={onPress}
//       style={styles.btnStyle}
//     >
//       {!!isLoading ? (
//         <ActivityIndicator size="large" color="white" />
//       ) : (
//         <Text style={styles.textStyle}>{text}</Text>
//       )}
//     </TouchableOpacity>
//   );
// };

// // define your styles
// const styles = StyleSheet.create({
//   btnStyle: {
//     height: 48,
//     backgroundColor: "blue",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 10,
//     paddingHorizontal: 16,
//   },
//   textStyle: {
//     fontSize: 16,
//     textTransform: "uppercase",
//     fontWeight: "bold",
//     color: "white",
//   },
// });

// export default ButtonWithLoader;
