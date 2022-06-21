import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

function SearchBar({ cityHandler }) {
  //var city = "San Francisco";
  const [searchedCity, setSearchedCity] = useState("");
  return (
    <View
      style={{
        marginTop: 15,
        flexDirection: "row",
        backgroundColor: "#eee",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "center",
        marginRight: 10,
        width: "95%",
        height: 60,
      }}
    >
      <View
        style={{
          marginLeft: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons name="location-sharp" size={24} />
        <TextInput
          style={{
            fontSize: 16,
            backgroundColor: "#eee",
            borderRadius: 20,
            fontWeight: "700",
            // marginTop: 7,
            marginLeft: 7,
            height: 50,
          }}
          maxLength={20}
          onChangeText={(text) => {
            setSearchedCity(text.split(",")[0]);
          }}
          value={searchedCity}
          placeholder="Search"
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          cityHandler(searchedCity);
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 8,
            backgroundColor: "white",
            borderRadius: 30,
            padding: 9,
          }}
        >
          <AntDesign name="clockcircle" size={11} style={{ marginRight: 6 }} />
          <Text>Search</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default SearchBar;

{
  /*


<View style={{ marginTop: 15, flexDirection: "row" }}>
      <GooglePlacesAutocomplete
        query={{ key: "AIzaSyBwhxaEHXmyvHkMo-9P2lzssJ0CArZBKKM" }}
        onPress={(data, details = null) => {
          console.log(data.description);
          const city = data.description.split(",")[0];
          cityHandler(city);
        }}
        placeholder="Search"
        styles={{
          textInput: {
            backgroundColor: "#eee",
            borderRadius: 20,
            fontWeight: "700",
            marginTop: 7,
          },
          textInputContainer: {
            backgroundColor: "#eee",
            borderRadius: 50,
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          },
        }}
        renderLeftButton={() => (
          <View style={{ marginLeft: 10 }}>
            <Ionicons name="location-sharp" size={24} />
          </View>
        )}
        renderRightButton={() => (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              //cityHandler(city);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 8,
                backgroundColor: "white",
                borderRadius: 30,
                padding: 9,
              }}
            >
              <AntDesign
                name="clockcircle"
                size={11}
                style={{ marginRight: 6 }}
              />
              <Text>Search</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>


*/
}
