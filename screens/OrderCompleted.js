import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import firebase from "../firebase";
import MenuItem from "../components/restaurantDetail/MenuItem";
import AntDesign from "react-native-vector-icons/AntDesign";

function OrderCompleted({ navigation }) {
  const [lastOrder, setLastOrder] = useState({
    items: [
      {
        title: "Lasagna1",
        description: "With butter lettuce, tomato and sauce bechamel",
        price: "$13.50",
        image:
          "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/1/23/0/FN_healthy-fast-food-red-robin-avocado-cobb-salad_s4x3.jpg.rend.hgtvcom.616.462.suffix/1516723515457.jpeg",
      },
    ],
  });

  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  const user = useSelector((state) => state.cartReducer.user);

  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db
      .collection("users")
      .doc(user?.uid)
      .collection("orders")
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          setLastOrder(doc.data());
        });
      });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          margin: 15,
          alignItems: "center",
          height: "98%",
        }}
      >
        <LottieView
          style={{ height: 100, alignSelf: "center", marginBottom: 20 }}
          source={require("../assets/animations/24585-cool-green-checkmark.json")}
          autoPlay
          speed={0.5}
          loop={false}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Your order at {restaurantName} has been placed for {totalUSD}
        </Text>
        <ScrollView>
          <MenuItem foods={lastOrder.items} hideCheckbox={true} />
          <LottieView
            style={{ height: 200, alignSelf: "center" }}
            source={require("../assets/animations/cooking.json")}
            autoPlay
            speed={0.5}
            loop={false}
          />
        </ScrollView>
        <View style={{ flexDirection: "row", margin: 30 }}>
          <TouchableOpacity
            onPress={() => navigation.replace("Home")}
            style={{ flexDirection: "row" }}
          >
            <AntDesign name="left" size={20} />
            <Text style={{ fontSize: 17, fontWeight: "500" }}>
              BACK TO HOME PAGE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default OrderCompleted;
