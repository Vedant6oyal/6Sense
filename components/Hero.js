import React, { useState, useContext, useEffect } from "react";
import OrderContext from "../context/userOrders/OrderContext";
import { icons, images, SIZES, COLORS, FONTS } from "../constants";

import {
  Dimensions,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import styled from "styled-components/native";

//import ViewPager from "@react-native-community/viewpager";

import VideoPlayer from "../components/VideoPlayer";
import { SafeAreaView } from "react-native-safe-area-context";
//import { event } from "react-native-reanimated";

const { height } = Dimensions.get("window");

const Hero = ({ videos }) => {
  const a = useContext(OrderContext);
  const [VisibleVideo, setVisibleVideo] = useState(0);
  // const randomNumber = Math.floor(Math.random() * 1000000).toString()

  // viewableItemsChanged = ({ viewableItems }) => {
  //   alert("Visible items are", viewableItems);
  // };
  const onViewRef = React.useRef((viewableItems) => {
    let videoVisible = viewableItems["viewableItems"][0]["key"];
    // console.log(videoVisible);
    setVisibleVideo(videoVisible);
    // // Use viewable items in state or as intended
    // alert(selec);
  });
  useEffect(() => {
    console.log(VisibleVideo);
  }, [VisibleVideo]);
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderItem = ({ item }) => (
    <View style={{ marginBottom: SIZES.padding * 2 }}>
      {/* Image */}
      <View
        style={{
          marginBottom: SIZES.padding,
          width: "100%",
          height: height - 60,
          borderRadius: SIZES.radius,
        }}
      >
        <VideoPlayer
          video={item.video}
          poster={item.photo}
          // isPlay={selected === index}
          isPlay={true}
        />
      </View>

      {/* Menu Item Info */}
      <Text style={{ ...FONTS.body2 }}>{item.name}</Text>

      <View
        style={{
          marginTop: SIZES.padding,
          flexDirection: "row",
          alignItems: "flex-around",
          width: "100%",
        }}
      >
        {/* Rating */}
        <Image
          source={icons.star}
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.primary,
            marginRight: 10,
          }}
        />
        <Text style={{ ...FONTS.body3 }}>{item.id}</Text>

        {/* Categories */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginLeft: 10,
          }}
        ></TouchableOpacity>
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
    </View>
  );

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => `${item.id}`}
      renderItem={renderItem}
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewConfigRef.current}
      contentContainerStyle={{
        paddingHorizontal: SIZES.padding * 2,
        paddingBottom: 30,
      }}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  containerHeader: {
    backgroundColor: "rgba(0,0,0,0)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 0,
    marginLeft: 90,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowRadius: 0,
    width: 220,
    height: 32,
  },
  text: {
    color: "rgba(0,0,0,1)",
    marginTop: 4,
    marginLeft: 33,
  },
  text2: {
    color: "rgba(0,0,0,1)",
    marginTop: 4,
    marginLeft: 26,
  },
  text3: {
    color: "rgba(0,0,0,1)",
    fontWeight: "bold",
    fontSize: 20,
  },
});
export default Hero;
