import React, { useState } from "react";
import { Text, TouchableOpacity, View, Modal, Alert } from "react-native";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import firebase from "../../firebase";
import LottieView from "lottie-react-native";

function ViewCart({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.7)",
    },

    modalCheckoutContainer: {
      backgroundColor: "white",
      padding: 16,
      height: 500,
      borderWidth: 1,
    },

    restaurantName: {
      textAlign: "center",
      fontWeight: "600",
      fontSize: 18,
      marginBottom: 10,
    },

    subtotalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
    },

    subTotalText: {
      textAlign: "left",
      fontWeight: "600",
      fontSize: 15,
      marginBottom: 10,
    },
  });

  const addOrderToFirebase = () => {
    setModalVisible(false);
    setLoading(true);
    const db = firebase.firestore();
    //const auth = firebase.auth();
    db.collection("users")
      .doc(user.uid)
      .collection("orders")
      .add({
        items: items,
        restaurantName: restaurantName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        totalPrice: totalUSD,
      })
      .then(
        setTimeout(() => {
          setLoading(false);
          navigation.navigate("OrderCompleted");
        }, 2500)
      );
  };

  const checkoutModalContent = () => {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalCheckoutContainer}>
          <Text style={styles.restaurantName}>{restaurantName}</Text>
          {items.map((item, index) => (
            <OrderItem key={index} item={item} />
          ))}
          <View style={styles.subtotalContainer}>
            <Text style={styles.subTotalText}> Subtotal</Text>
            <Text> {totalUSD}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              onPress={() => {
                setLoading(true);
                if (user) {
                  addOrderToFirebase();
                } else {
                  Alert.alert("Alert", "You should to login to complete you order", [
                    {
                      text:"Cancel",
                      onPress:()=>{
                        setModalVisible(false);
                        setLoading(false);
                      },
                    },
                    {
                      text: "Login",
                      onPress: () => {
                        setLoading(false);
                        setModalVisible(false);
                        navigation.navigate("SignIn");
                      },
                    },
                  ]);
                }
              }}
              style={{
                marginTop: 20,
                backgroundColor: "black",
                alignItems: "center",
                padding: 13,
                borderRadius: 30,
                width: 300,
                position: "relative",
              }}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Checkout</Text>
              <Text
                style={{
                  position: "absolute",
                  right: 20,
                  top: 15,
                  color: "white",
                  fontSize: 15,
                }}
              >
                {total ? totalUSD : ""}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      {total ? (
        <View>
          <Modal
            animationType="slide"
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            {checkoutModalContent()}
          </Modal>

          <View
            style={{
              flex: 1,
              alignSelf: "center",
              justifyContent: "center",
              flexDirection: "row",
              position: "absolute",
              bottom: 30,
            }}
          >
            <View
              style={{
                width: 300,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setModalVisible(true)}
                style={{
                  marginTop: 20,
                  backgroundColor: "black",
                  flexDirection: "row",
                  justifyContent: "center",
                  padding: 5,
                  borderRadius: 30,
                  width: "100%",
                  position: "relative",
                }}
              >
                <Text style={{ color: "white", fontSize: 18, margin: 10 }}>
                  View Cart
                </Text>
                <Text style={{ color: "white", fontSize: 18, margin: 10 }}>
                  {totalUSD}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
      {loading ? (
        <View
          style={{
            backgroundColor: "black",
            position: "absolute",
            opacity: 0.6,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <LottieView
            style={{ height: 150 }}
            source={require("../../assets/animations/scanner.json")}
            autoPlay
            speed={3}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
}

export default ViewCart;
