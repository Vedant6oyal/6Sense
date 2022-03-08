import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

import Tabs from "./navigation/tabs";
import OrderList from "./screens/OrderList";
import OrderState from "./context/userOrders/OrderState";
import { Suggestion, GoToBrowser } from "./screens";

const Stack = createStackNavigator();

const App = () => {
  const [loaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <OrderState>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"Home"}
        >
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="OrderList" component={OrderList} />
          <Stack.Screen name="Suggestion" component={Suggestion} />
        </Stack.Navigator>
      </NavigationContainer>
    </OrderState>
  );
};

export default App;
