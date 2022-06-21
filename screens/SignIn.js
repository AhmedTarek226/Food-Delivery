import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LottieView from "lottie-react-native";
import { TextInput } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import firebase from "firebase";
import { useDispatch } from "react-redux";

function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <ScrollView>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 19, fontWeight: "700", top: 40 }}>
            Hello, Dear
          </Text>
          <LottieView
            style={{
              height: 200,
              width: 100,
              justifyContent: "center",
              alignSelf: "center",
            }}
            autoPlay
            source={require("../assets/animations/99298-food-delivery.json")}
            speed={0.5}
          />
          <InputText
            placeholder={"Enter Your Email"}
            icon={"email"}
            type={email}
            set={setEmail}
            secure={false}
          />
          <InputText
            placeholder={"Enter Your Password"}
            icon={"onepassword"}
            type={password}
            set={setPassword}
            secure={true}
          />
          <SignInButton
            email={email}
            password={password}
            navigation={navigation}
            setLoading={setLoading}
            dispatch={dispatch}
          />
          <SignUpButton navigation={navigation} />
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 40,
          right: 25,
          borderBottomWidth: 1.5,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Skip Now</Text>
          <AntDesign name="right" size={20} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <View
          style={{
            backgroundColor: "black",
            position: "absolute",
            opacity: 0.6,
            justifyContent: "center",
            alignItems: "center",
            height: "103%",
            width: "100%",
            flex: 1,
          }}
        >
          <LottieView
            style={{ height: 150 }}
            source={require("../assets/animations/scanner.json")}
            autoPlay
            speed={3}
          />
        </View>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
}

const InputText = (props) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
      width: "100%",
      height: "12%",
    }}
  >
    <MaterialCommunityIcons name={props.icon} size={30} style={{ top: 5 }} />
    <TextInput
      style={{
        height: 40,
        width: "87%",
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        marginLeft: 5,
      }}
      keyboardType={props.icon === "email" ? "email-address" : "default"}
      secureTextEntry={props.secure}
      value={props.type}
      onChangeText={(text) => props.set(text)}
      placeholder={props.placeholder}
      numberOfLines={1}
      maxLength={20}
    />
  </View>
);

const SignInButton = (props) => (
  <View
    style={{
      width: "70%",
      height: "10%",
      backgroundColor: "black",
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 35,
    }}
  >
    <TouchableOpacity
      onPress={() => {
        props.setLoading(true);
        const auth = firebase.auth();
        auth
          .signInWithEmailAndPassword(props.email, props.password)
          .then((auth) => {
            if (auth) {
              props.dispatch({
                type: "SET_USER",
                user: auth.user,
              });
              props.setLoading(false);
              props.navigation.replace("Home");
            }
          })
          .catch(() => {
            props.dispatch({
              type: "SET_USER",
              user: null,
            });
            props.setLoading(false);
            Alert.alert("Error", "Email or Password is not vaild", [
              {
                text: "Okay",
                onPress: () => {},
              },
            ]);
          });
      }}
      activeOpacity={0.9}
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 17, fontWeight: "600" }}>
        Sign In
      </Text>
    </TouchableOpacity>
  </View>
);

const SignUpButton = (props) => (
  <View
    style={{
      flexDirection: "row",
      width: "60%",
      justifyContent: "space-evenly",
      marginTop: 10,
    }}
  >
    <Text style={{ fontSize: 15, fontWeight: "400" }}>
      I don't have an account
    </Text>
    <TouchableOpacity onPress={() => props.navigation.navigate("SignUp")}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          textDecorationLine: "underline",
        }}
      >
        Sign Up
      </Text>
    </TouchableOpacity>
  </View>
);

export default SignIn;
