import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import RestaurantDetail from "./screens/RestaurantDetail";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";
import OrderCompleted from "./screens/OrderCompleted";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import UserProfile from "./screens/UserProfile";
import Orders from "./screens/Orders";
import OrderItems from "./screens/OrderItems";

const store = configureStore();

function RootNavigation(props) {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={screenOptions}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
          <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="Orders" component={Orders} />
          <Stack.Screen name="OrderItems" component={OrderItems} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}

export default RootNavigation;
