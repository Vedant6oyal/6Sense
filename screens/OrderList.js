import React, { useContext, useEffect, useState } from "react";
import OrderContext from "../context/userOrders/OrderContext";
import { Text, Image } from "react-native";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import { icons, SIZES, COLORS } from "../constants";
function OrderList({ route, navigation }) {
  //const dummy = [{ name: "Vedant", quantity: 1 }];
  const a = useContext(OrderContext);
  const [videos, setVideos] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  useEffect(() => {
    let videoData = [];
    fetch(
      "https://learn-project-3195b-default-rtdb.firebaseio.com/Restaurants/Nathus/menuData.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.map((videoItem) => {
          videoData.push(videoItem);
        });
        videoData.shift();
        //alert(foodData[0]);

        setVideos(videoData);
      })
      .catch((e) => {
        alert(e);
      });
  }, []);
  {
    if (showSuggestions) {
      //setShowSuggestions(false);
      setTimeout(() => {
        navigation.navigate("Suggestion", { videos }); //Taking "Suggestion" screen from Stack.Screen in App.js
      }, 3000);
    }
  }
  const Item = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <View
          style={{
            alignItems: "center",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Image
            source={{ uri: item.photo }}
            style={{ width: 40, height: 40 }}
          />
          <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
          <Text>{item.quantity}</Text>
        </View>
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            paddingBottom: 0,
            backgroundColor: COLORS.white,
            borderRadius: 7,
            alignItems: "center",
            justifyContent: "center",
            marginRight: SIZES.padding,
            marginLeft: SIZES.padding,
            flexDirection: "row",
            ...styles.shadow,
          }}
          //onPress={() => onSelectCategory(item)}
        >
          <TouchableOpacity
            style={{ width: 20 }}
            onPress={() => {
              setShowSuggestions(false);
              let orderItems = a.orderList;
              if (
                !a.orderList.some((orderItem) => orderItem.name == item.name)
              ) {
                orderItems.push({ name: item.name, quantity: 1 });
                a.update([...orderItems]);
              } else {
                orderItems = a.orderList.map((orderItem) => {
                  orderItem.name === item.name
                    ? orderItem.quantity++
                    : orderItem.quantity;
                  a.update([...orderItems]);
                });
              }

              //alert(JSON.stringify(a.orderList));
            }}
          >
            <Text style={styles.text3}> + </Text>
          </TouchableOpacity>
          <Text style={styles.text3}>
            {a.orderList.find((element) => {
              return element.name == item.name;
            }) === undefined
              ? 0
              : a.orderList.find((element) => {
                  return element.name == item.name;
                }).quantity}
          </Text>
          <TouchableOpacity
            style={{ width: 20 }}
            onPress={() => {
              let orderItems = a.orderList;
              if (
                !a.orderList.some((orderItem) => orderItem.name == item.name)
              ) {
                orderItems.push({ name: item.name, quantity: 0 });
                a.update([...orderItems]);
              } else {
                orderItems = a.orderList.map((orderItem) => {
                  orderItem.name === item.name && orderItem.quantity > 0
                    ? orderItem.quantity--
                    : orderItem.quantity;
                  a.update([...orderItems]);
                });
              }

              //alert(JSON.stringify(a.orderList));
            }}
          >
            <Text style={styles.text3}> - </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontStyle: "italic",
            fontSize: 20,
          }}
        >
          Your Order
        </Text>
      </View>

      <FlatList
        style={{ flex: 1 }}
        data={a.orderList}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.name}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  listItem: {
    margin: 5,
    padding: 5,
    backgroundColor: "#FFF",
    width: "100%",
    height: "10%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5,
  },
});

export default OrderList;
