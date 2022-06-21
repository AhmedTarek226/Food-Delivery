import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
import { useSelector } from "react-redux";
import Moment from "moment";
import LottieView from "lottie-react-native";

function Orders({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.cartReducer.user);
  useEffect(() => {
    if (user) {
      setLoading(true);
      const db = firebase.firestore();
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
          setLoading(false);
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#eee",
      }}
    >
      <AppBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          height: "100%",
          width: "95%",
          alignSelf: "center",
          marginVertical: 10,
        }}
      >
        {user != null && orders != null ? (
          <>
            {orders?.map((order, index) => (
              <Order key={index} order={order} navigation={navigation} />
            ))}
          </>
        ) : (
          <Text style={{ color: "black",fontSize:16,fontWeight:'500' }}>You have no orders</Text>
        )}
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

const AppBar = () => (
  <View
    style={{
      height: "9%",
      width: "100%",
      backgroundColor:'black',
      //backgroundColor: "#546E7A",
      borderBottomColor: "gray",
      borderBottomWidth: 0.7,
      paddingTop: 20,
      paddingLeft: 10,
    }}
  >
    <Text
      style={{
        fontSize: 19,
        fontWeight: "700",
        color: "white",
      }}
    >
      My Orders
    </Text>
  </View>
);

const Order = (props) => (
  <View
    style={{
      marginTop: "3%",
      backgroundColor:'#F1F8E9',
      // backgroundColor: "#FFCCBC",
      height: 150,
      width: "100%",
      padding: 10,
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignContent: "center",
      alignSelf: "center",
      borderRadius: 5,
      borderColor:'black',
      borderWidth:0.3
    }}
  >
    <TouchableOpacity
      onPress={() => props.navigation.navigate("OrderItems",{items:props.order.data.items,restaurantName:props.order.data.restaurantName})}
      activeOpacity={0.8}
      style={{
        height: "100%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <Text style={styles.order_text}>Order Id: {props.order.id}</Text>
      <Text style={styles.order_text}>
        Ordered At:{" "}
        {Moment(props.order.data.createdAt.toDate()).format("D/MM/yyyy h:mm a")}
      </Text>
      <Text style={styles.order_text}>
        Number of products: {props.order.data.items.length}
      </Text>
      <Text style={styles.order_text}>
        Total Price: {props.order.data.totalPrice}{" "}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  order_text: {
    fontSize: 17,
    color: "black",
    fontWeight: "500",
  },
});

export default Orders;
