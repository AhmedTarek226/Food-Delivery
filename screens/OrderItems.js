import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import MenuItem from "../components/restaurantDetail/MenuItem";

function OrderItems({ route, navigation }) {
  // const {items,restaurantName} = route.params;
  return (
    <SafeAreaView
    style={{
        flex:1
    }}
    >
        <Text style={{ fontSize: 20, fontWeight: "bold" ,margin:20}}>
          Your order at {route.params.restaurantName}
        </Text>
      <ScrollView>
        <MenuItem
          foods={route.params.items}
          hideCheckbox={true}
          marginLeft={15}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default OrderItems;
