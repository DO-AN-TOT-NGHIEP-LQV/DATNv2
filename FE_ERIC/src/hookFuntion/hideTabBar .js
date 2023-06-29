// // import { useEffect } from "react";
// // import { useNavigation } from "@react-navigation/native";

// // const hideTabBar = () => {
// //   const navigation = useNavigation();

// //   useEffect(() => {
// //     const hideTabBar = () => {
// //       navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
// //     };

// //     const showTabBar = () => {
// //       navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" } });
// //     };

// //     // Hide the TabBar when the component using this hook mounts
// //     hideTabBar();

// //     // Show the TabBar when the component using this hook is unmounted
// //     return () => {
// //       showTabBar();
// //     };
// //   }, [navigation]);

// //   // Return an empty cleanup function
// //   return () => {};
// // };

// // export default hideTabBar;

// import { useNavigation, useFocusEffect } from "@react-navigation/native";
// import { useCallback } from "react";

// const hideTabBar = () => {
//   const navigation = useNavigation();

//   useFocusEffect(
//     useCallback(() => {
//       const hideTabBar = () => {
//         navigation
//           .getParent()
//           ?.setOptions({ tabBarStyle: { display: "none" } });
//       };

//       const showTabBar = () => {
//         navigation
//           .getParent()
//           ?.setOptions({ tabBarStyle: { display: "flex" } });
//       };

//       // Hide the TabBar when the component is focused
//       hideTabBar();

//       // Show the TabBar when the component is unfocused
//       return () => {
//         showTabBar();
//       };
//     }, [navigation])
//   );

//   // Return an empty cleanup function
//   return () => {};
// };

// export default hideTabBar;
