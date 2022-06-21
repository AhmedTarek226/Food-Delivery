import React from "react";
import { Image, Text, View } from "react-native";

const yelpRestaurnatInfo = {
  name: "Farmhouse Kitchen Thai Cuisine",
  image:
    "https://a.cdn-hotels.com/gdcs/production141/d778/6b200721-9661-4680-aca2-d6e33ce46cf0.jpg",
  price: "$$",
  rating: 4.5,
  reviews: "1500",
  categories: [{ title: "Thai" }, { title: "Coffe" }],
};

function About(props) {
  const { name, image, price, rating, reviews, categories } =
    props.route.params;
  const formattedCategories = categories
    .map((category) => category.title)
    .join(" . ");
  const description = `${formattedCategories} ${
    price ? " . " + price : ""
  } . 💳 . ${rating} ⭐️ (${reviews}+)`;

  return (
    <View>
      <RestaurantImage image={image} />
      <RestaurantName name={name} />
      <RestaurantDeccription description={description} />
    </View>
  );
}

const RestaurantImage = (props) => (
  <Image source={{ uri: props.image }} style={{ height: 180, width: "100%" }} />
);

const RestaurantName = (props) => (
  <Text
    style={{
      fontSize: 27,
      fontWeight: "600",
      marginTop: 10,
      marginHorizontal: 15,
    }}
  >
    {props.name}
  </Text>
);

const RestaurantDeccription = (props) => (
  <Text
    style={{
      marginTop: 10,
      marginHorizontal: 15,
      fontSize: 15,
      fontWeight: "400",
    }}
  >
    {props.description}
  </Text>
);
export default About;
