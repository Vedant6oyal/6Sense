import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, icons, SIZES } from "../constants";
import Hero from "../components/Hero";

function Suggestion({ route, navigation }) {
  //const [videoApi, setVideoApi] = useState([]);
  const { videos } = route.params;

  // useEffect(() => {
  //   let videoData = [];
  //   fetch(
  //     "https://learn-project-3195b-default-rtdb.firebaseio.com/Restaurants/Nathus/menuData.json"
  //   )
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       data.map((videoItem) => {
  //         videoData.push(videoItem);
  //       });
  //       videoData.shift();
  //       //alert(foodData[0]);
  //       setVideoApi(videoData);
  //     })
  //     .catch((e) => {
  //       alert(e);
  //     });
  // }, []);
  return (
    <SafeAreaView>
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
            source={icons.close}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontStyle: "italic",
          fontSize: 20,
          paddingBottom: 20,
        }}
      >
        Must Order
      </Text>
      <Hero videos={videos} />
    </SafeAreaView>
  );
}
export default Suggestion;
