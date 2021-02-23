import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
    container: {
        color: "green"
    },
});

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={ styles.container }>Universal React with Expo.</Text>
      <Text style={ styles.container }>Very conveniently the frontend of PurdueEats!!</Text>
    </View>
  );
}
