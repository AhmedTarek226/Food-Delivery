import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const localRestaurants = [
  {
    name: "Beachside Bar",
    image_url:
      "https://static.onecms.io/wp-content/uploads/sites/9/2020/04/24/ppp-why-wont-anyone-rescue-restaurants-FT-BLOG0420.jpg",
    categories: ["Cafe", "Bar"],
    price: "$$",
    review_count: 1244,
    rating: 4.5,
  },
  {
    name: "Benihana",
    image_url:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    categories: ["Cafe", "Bar"],
    price: "$$",
    review_count: 1244,
    rating: 3.7,
  },
  {
    name: "India's Grill",
    image_url:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    categories: ["Indian", "Bar"],
    price: "$$",
    review_count: 700,
    rating: 4.9,
  },
];
function RestaurantItems({ navigation, ...props }) {
  return (
    <>
      {props.restaurantData.map((restaurant, index) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("RestaurantDetail",{
            name: restaurant.name,
            image: restaurant.image_url,
            price: restaurant.price,
            reviews: restaurant.review_count,
            rating: restaurant.rating,
            categories: restaurant.categories
          })}
          key={index}
          activeOpacity={0.8}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 15,
              height: 230,
              width: "95%",
              marginTop: 10,
              marginBottom: 1,
              alignSelf: "center",
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <RestaurantImage image={restaurant.image_url} />
            <RestaurantInfo name={restaurant.name} rating={restaurant.rating} />
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
}

const RestaurantImage = (props) => (
  <>
    <Image
      source={{ uri: props.image }}
      style={{
        height: "76%",
        width: "100%",
      }}
    />
    <TouchableOpacity
      onPress={() => console.log("aaaaaaaa")}
      style={{ position: "absolute", top: 20, right: 30 }}
    >
      <MaterialCommunityIcons name="heart-outline" size={25} color="white" />
    </TouchableOpacity>
  </>
);

const RestaurantInfo = (props) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <View
      style={{
        paddingTop: 10,
      }}
    >
      <Text
        style={{
          fontSize: 15,
          fontWeight: "700",
        }}
      >
        {props.name}
      </Text>
      <Text
        style={{
          color: "gray",
          paddingTop: 2,
        }}
      >
        35-45 . min
      </Text>
    </View>
    <View
      style={{
        borderRadius: 50,
        backgroundColor: "#eee",
        height: 30,
        width: 30,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontWeight: "700", fontSize: 13 }}>{props.rating}</Text>
    </View>
  </View>
);

export default RestaurantItems;
