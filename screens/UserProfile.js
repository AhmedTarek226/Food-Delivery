import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import firebase from "firebase";
import Bar from "../components/userProfile/Bar";
import UserInformation from "../components/userProfile/UserInformation";
import SignOutButton from "../components/userProfile/SignOutButton";
import SignInButton from "../components/userProfile/SignInButton";
import { View } from "react-native";

function UserProfile({ navigation }) {
  const user = useSelector((state) => state.cartReducer.user);
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    if (user) {
      //setLoading(true);
      const db = firebase.firestore();
      db.collection("users")
        .doc(user.uid)
        .collection("information")
        .onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => setUserInfo(doc.data()));
          // setLoading(false);
        });
    } else {
      setUserInfo("");
    }
  }, []);

  return (
    <View style={{flex:1, backgroundColor: "#eee", height:'100%',justifyContent:"center"}}>
      {user ? (
        <View style={{ flexDirection: "column" }}>
          <Bar name={userInfo.name} />
          <UserInformation
            email={user.email}
            phone={userInfo.phone}
            address={userInfo.address}
          />
          <SignOutButton user={user} />
        </View>
      ) : (
        <View style={{}}>
          <SignInButton navigation={navigation} />
        </View>
      )}
    </View>
  );
}

export default UserProfile;
