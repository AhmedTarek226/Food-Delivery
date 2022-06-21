import React from "react";
import { ScrollView, View } from "react-native";
import About from "../components/restaurantDetail/About";
import MenuItem from "../components/restaurantDetail/MenuItem";
import ViewCart from "../components/restaurantDetail/ViewCart";

const foods = [
  {
    title: "Seafood",
    description: "Seafood Garden Lobster, Shrimp, Ceviche, Oysters",
    price: "$16",
    image:
      "https://s3-media0.fl.yelpcdn.com/bphoto/VSig67945LHUg80u9K-QhQ/o.jpg",
  },
  {
    title: "Fish Tacos",
    description:
      "Atlantic cod fish, aji amarillo aioli, pico de gallo, coleslaw, queso cotija",
    price: "$17",
    image:
      "https://s3-media0.fl.yelpcdn.com/bphoto/7iDm-EvJi91ygL1SsGBzLA/o.jpg",
  },
  {
    title: "Crispy Calamari",
    description: "Cornmeal crusted calamari, pico de gallo, aji amarillo aioli",
    price: "$20",
    image:
      "https://s3-media0.fl.yelpcdn.com/bphoto/ftQERDMLL1b5TPu5p1WzeA/o.jpg",
  },
  {
    title: "Lasagna",
    description: "With butter lettuce, tomato and sauce bechamel",
    price: "$13.50",
    image:
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/1/23/0/FN_healthy-fast-food-red-robin-avocado-cobb-salad_s4x3.jpg.rend.hgtvcom.616.462.suffix/1516723515457.jpeg",
  },
];

function RestaurantDetail({ route, navigation }) {
  return (
    <View style={{ height: "100%" }}>
      <About route={route} />
      {/* divider */}
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
          marginTop: 10,
        }}
      />
      <MenuItem restaurantName={route.params.name} foods={foods} />
      <ViewCart navigation={navigation} />
    </View>
  );
}

export default RestaurantDetail;
