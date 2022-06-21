import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

function BottomTabs({ navigation }) {
  const [activeBottomTab, setActiveBottomTab] = useState("home");
  return (
    <View
      style={{
        height: 55,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
        alignContent: "center",
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: "white",
      }}
    >
      <BottomTab
        iconName="home"
        tabName="Home"
        activeBottomTab={activeBottomTab}
        setActiveBottomTab={setActiveBottomTab}
        navigation={navigation}
        routePage={"Home"}
      />
      <BottomTab
        iconName="search"
        tabName="Browse"
        activeBottomTab={activeBottomTab}
        setActiveBottomTab={setActiveBottomTab}
        navigation={navigation}
        routePage={"Home"}
      />
      <BottomTab
        iconName="shopping-bag"
        tabName="Grocery"
        activeBottomTab={activeBottomTab}
        setActiveBottomTab={setActiveBottomTab}
        navigation={navigation}
        routePage={"Home"}
      />
      <BottomTab
        iconName="receipt"
        tabName="Orders"
        activeBottomTab={activeBottomTab}
        setActiveBottomTab={setActiveBottomTab}
        navigation={navigation}
        routePage={"Orders"}
      />
      <BottomTab
        iconName="user"
        tabName="Account"
        activeBottomTab={activeBottomTab}
        setActiveBottomTab={setActiveBottomTab}
        navigation={navigation}
        routePage={"UserProfile"}
      />
    </View>
  );
}

const BottomTab = (props) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => {
      props.setActiveBottomTab(props.iconName);
      props.navigation.navigate(props.routePage);
    }}
  >
    <View>
      <FontAwesome5
        name={props.iconName}
        size={25}
        style={{
          marginBottom: 5,
          alignSelf: "center",
          color: props.activeBottomTab === props.iconName ? "black" : "gray",
        }}
      />
      <Text style={{ fontSize: 12, fontWeight: "700" }}>{props.tabName}</Text>
    </View>
  </TouchableOpacity>
);

export default BottomTabs;
