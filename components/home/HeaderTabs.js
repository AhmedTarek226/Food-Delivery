import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

function HeaderTabs(props) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <HeaderButton
        text="Delivery"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
      <HeaderButton
        text="Pickup"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
    </View>
  );
}

const HeaderButton = (props) => (
  <TouchableOpacity
    style={{
      backgroundColor: props.activeTab === props.text ? "black" : "white",
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 20,
    }}
    onPress={() => props.setActiveTab(props.text)}
  >
    <Text
      style={{
        color: props.activeTab === props.text ? "white" : "black",
        fontSize: 15,
        fontWeight: "700",
      }}
    >
      {props.text}
    </Text>
  </TouchableOpacity>
);
export default HeaderTabs;
