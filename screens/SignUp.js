import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LottieView from "lottie-react-native";
import { TextInput } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "firebase";
import { useDispatch } from "react-redux";

function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "height"}
        >
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
              source={require("../assets/animations/90409-delivery-truck.json")}
              speed={0.5}
            />
            <InputText
              placeholder={"Enter Your Name"}
              icon={"account-circle"}
              type={name}
              set={setName}
              secure={false}
            />
            <InputText
              placeholder={"Enter Your Phone Number"}
              icon={"cellphone"}
              type={phone}
              set={setPhone}
              secure={false}
            />
            <InputText
              placeholder={"Enter Your Address"}
              icon={"home-circle"}
              type={address}
              set={setAddress}
              secure={false}
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
            <InputText
              placeholder={"Confirm Your Password"}
              icon={"onepassword"}
              type={confirmPassword}
              set={setConfirmPassword}
              secure={true}
            />

            {/* <InputText placeholder={"Confirm Your Password"} icon = {"onepassword"} /> */}
            <SignUpButton
              navigation={navigation}
              name={name}
              phone={phone}
              address={address}
              email={email}
              password={password}
              confirmPassword={confirmPassword}
              setLoading={setLoading}
              dispatch={dispatch}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
      height: 60,
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
      keyboardType={props.icon === "email" ? "email-address" : props.icon==="password"?"ascii-capable":"decimal-pad"}
      secureTextEntry={props.secure}
      value={props.type}
      onChangeText={(text) => props.set(text)}
      placeholder={props.placeholder}
      numberOfLines={1}
      maxLength={30}
    />
  </View>
);

const SignUpButton = (props) => (
  <View
    style={{
      width: "70%",
      height: 50,
      backgroundColor: "black",
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 35,
    }}
  >
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => {
        props.setLoading(true);
        if (
          props.name &&
          props.phone &&
          props.address &&
          props.email &&
          props.password &&
          props.confirmPassword
        ) {
          if (props.password === props.confirmPassword) {
            const auth = firebase.auth();
            const db = firebase.firestore();
            auth
              .createUserWithEmailAndPassword(props.email, props.password)
              .then((auth) => {
                if (auth) {
                  props.dispatch({
                    type: "SET_USER",
                    user: auth.user,
                  });
                  props.setLoading(false);
                  props.navigation.replace("Home");
                  db.collection("users")
                    .doc(auth.user.uid)
                    .collection("information")
                    .add({
                      name: props.name,
                      phoneNumber: props.phone,
                      address: props.address,
                    });
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
          } else {
            props.setLoading(false);
            Alert.alert("Error", "Password is not matching", [
              {
                text: "Okay",
                onPress: () => {},
              },
            ]);
          }
        } else {
          props.setLoading(false);
          Alert.alert("Error", "Please fill the empty places", [
            {
              text: "Okay",
              onPress: () => {},
            },
          ]);
        }
      }}
    >
      <Text style={{ color: "white", fontSize: 17, fontWeight: "600" }}>
        Sign Up
      </Text>
    </TouchableOpacity>
  </View>
);

export default SignUp;
