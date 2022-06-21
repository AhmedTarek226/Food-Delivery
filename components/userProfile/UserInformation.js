import React from "react";
import { Text, View } from "react-native";

function UserInformation({ user }) {
  return (
    <View
      style={{
        flexDirection: "row",
        height: "15%",
        margin: 10,
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 2,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          backgroundColor: "white",
          borderBottomLeftRadius: 20,
          borderTopLeftRadius: 20,
          width: "35%",
          justifyContent: "space-evenly",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>Email</Text>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>Phone Number</Text>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>Address</Text>
      </View>
      <View style={{ borderColor: "black", borderWidth: 0.5 }} />
      <View
        style={{
          flexDirection: "column",
          backgroundColor: "white",
          borderBottomRightRadius: 20,
          borderTopRightRadius: 20,
          width: "64.5%",
          justifyContent: "space-evenly",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "500" }}> user.email</Text>
        <Text style={{ fontSize: 15, fontWeight: "500" }}> user.phone</Text>
        <Text style={{ fontSize: 15, fontWeight: "500" }}> user.address</Text>
      </View>
    </View>
  );
}

export default UserInformation;
