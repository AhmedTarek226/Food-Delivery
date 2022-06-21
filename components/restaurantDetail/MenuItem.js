import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from "react-redux";
//import CheckBox from "@react-native-community/checkbox";

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 15,
  },
  titleStyle: {
    fontSize: 19,
    fontWeight: "600",
  },
  foodInfo: {
    justifyContent: "space-evenly",
    width: 230,
  },
});

function MenuItem({ restaurantName, foods, hideCheckbox, marginLeft }) {
  // const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const dispatch = useDispatch();
  const selectItem = (item, checkboxValue) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...item,
        restaurantName: restaurantName,
        checkboxValue: checkboxValue,
      },
    });
  };

  const cartItems = useSelector(
    (state) => state.cartReducer.selectedItems.items
  );

  const isFoodInCart = (food, cartItems) =>
    Boolean(cartItems.find((item) => item.title === food.title));

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {foods.map((food, index) => (
        <View key={index}>
          <View style={styles.menuItemStyle}>
            {hideCheckbox ? (
              <></>
            ) : (
              <BouncyCheckbox
                iconStyle={{ borderRadius: 0 }}
                isChecked={isFoodInCart(food, cartItems)}
                fillColor="green"
                onPress={(checkboxValue) => selectItem(food, checkboxValue)}
              />
            )}
            <FoodInfo food={food} />
            <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0} />
          </View>
          {/* divider */}
          <View
            style={{
              borderBottomColor: "#eee",
              borderBottomWidth: 1,
              marginHorizontal: 20,
            }}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const FoodInfo = (props) => (
  <View style={styles.foodInfo}>
    <Text style={styles.titleStyle}> {props.food.title} </Text>
    <Text> {props.food.description} </Text>
    <Text> {props.food.price} </Text>
  </View>
);

const FoodImage = ({ marginLeft, ...props }) => (
  <View>
    <Image
      style={{
        height: 100,
        width: 100,
        borderRadius: 8,
        marginLeft: marginLeft,
      }}
      source={{ uri: props.food.image }}
    />
  </View>
);

export default MenuItem;
