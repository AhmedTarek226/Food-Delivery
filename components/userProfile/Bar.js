import React from "react";
import { Text, View } from "react-native";

function Bar({ name }) {
  return (
    <View
      style={{
        height: 60,
        width: "100%",
        backgroundColor: "white",
        padding: 10,
        marginTop: 5,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "600" }}>Welcome, {name}</Text>
    </View>
  );
}

export default Bar;
