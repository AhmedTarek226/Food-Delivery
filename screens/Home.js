import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import Categories from "../components/home/Categories";
import HeaderTabs from "../components/home/HeaderTabs";
import RestaurantItems from "../components/home/RestaurantItems";
import SearchBar from "../components/home/SearchBar";
import { localRestaurants } from "../components/home/RestaurantItems";
import BottomTabs from "../components/home/BottomTabs";

const YELP_API_KEY =
  "eZ6UaSs5FxHkbKAm4HpnBablAN59wW0wdArxMRETbfFi4AJmf2a5uD9fwTHO0frFLHC4_nAmzlZ5Uwno7FgFWSoN7xAu3dOSrrT0K3qt80D4Mm9cRPBIHfPdevulYnYx";

function Home({navigation}) {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [city, setCity] = useState("Hollywood");
  const [activeTab, setActiveTab] = useState("Delivery");

  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) =>
        setRestaurantData(
          json.businesses.filter((business) =>
            business.transactions.includes(activeTab.toLowerCase())
          )
        )
      );
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]);

  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems restaurantData={restaurantData} navigation ={navigation} />
      </ScrollView>
      <BottomTabs navigation={navigation}/>
    </SafeAreaView>
  );
}

export default Home;
