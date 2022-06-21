import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function SignInButton({ navigation }) {
  return (
    <View
      style={{
        width: 200,
        height: 50,
        backgroundColor: "black",
        borderRadius: 20,
        alignSelf: "center",
        marginTop: 35,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.replace("SignIn")}
        activeOpacity={0.9}
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 17, fontWeight: "600" }}>
          Sign in
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignInButton;
