import React, { useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import { icons, images, SIZES, COLORS, FONTS } from "../constants";
import OrderContext from "../context/userOrders/OrderContext";

const Home = ({ navigation }) => {
  const a = useContext(OrderContext);
  // Dummy Datas

  const categoryData = [
    {
      id: 1,
      name: "Rice",
      icon: icons.rice_bowl,
    },
    {
      id: 2,
      name: "Noodles",
      icon: icons.noodle,
    },
    {
      id: 3,
      name: "Hot Dogs",
      icon: icons.hotdog,
    },
    {
      id: 4,
      name: "Salads",
      icon: icons.salad,
    },
    {
      id: 5,
      name: "Burgers",
      icon: icons.hamburger,
    },
    {
      id: 6,
      name: "Pizza",
      icon: icons.pizza,
    },
    {
      id: 7,
      name: "Snacks",
      icon: icons.fries,
    },
    {
      id: 8,
      name: "Sushi",
      icon: icons.sushi,
    },
    {
      id: 9,
      name: "Desserts",
      icon: icons.donut,
    },
    {
      id: 10,
      name: "Drinks",
      icon: icons.drink,
    },
  ];

  // price rating
  const affordable = 1;
  const fairPrice = 2;
  const expensive = 3;

  //const myDoc = doc(db, "Restaurants", "Nathus", "menuData", "2");

  const [categories, setCategories] = React.useState(categoryData);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [menuItems, setMenuItems] = React.useState(null);
  const [foodMenu, setFoodMenu] = React.useState(true);
  // To get all items in selected category

  useEffect(() => {
    let foodData = [];
    fetch(
      "https://learn-project-3195b-default-rtdb.firebaseio.com/Restaurants/Nathus/menuData.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.map((foodItem) => {
          foodData.push(foodItem);
          // if (foodItem.category === selectedCategory) {
          //   foodData.push(foodItem);
          // }
        });
        foodData.shift();

        //alert(foodData[0]);
        setMenuItems(
          foodData.filter((item) => item.category === selectedCategory)
        );
      })
      .catch((e) => {
        alert(e);
      });
  }, [selectedCategory]);

  //To get all items in the menu of the restaurant
  useEffect(() => {
    let restaurantName = "Nathus";
    let foodData = [];
    fetch(
      `https://learn-project-3195b-default-rtdb.firebaseio.com/Restaurants/${restaurantName}/menuData.json`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.map((foodItem) => {
          foodData.push(foodItem);
        });
        foodData.shift();
        //alert(foodData[0]);
        setMenuItems(foodData);
      })
      .catch((e) => {
        alert(e);
      });
  }, []);
  //Showing the categories
  useEffect(() => {
    let foodCategories = [];
    let categoryTitle = foodMenu ? "categories" : "drinkCategories";
    fetch(
      `https://learn-project-3195b-default-rtdb.firebaseio.com/Restaurants/Nathus/${categoryTitle}.json`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.map((category) => {
          foodCategories.push(category);
        });
        //alert(foodCategories[0]);
        //setMenuItems(foodData);
      })
      .then(() => {
        let resCategories = categoryData.filter((categoryItem) => {
          return foodCategories.includes(categoryItem.name);
        });
        setCategories(resCategories);
      })
      .catch((e) => {
        alert(e);
      });

    let foodData = [];
    let typeSelected = foodMenu ? "Food" : "Drinks";
    fetch(
      "https://learn-project-3195b-default-rtdb.firebaseio.com/Restaurants/Nathus/menuData.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.map((foodItem) => {
          foodData.push(foodItem);
          // if (foodItem.category === selectedCategory) {
          //   foodData.push(foodItem);
          // }
        });
        foodData.shift();

        setMenuItems(foodData.filter((item) => item.type === typeSelected));
      })
      .catch((e) => {
        alert(e);
      });
  }, [foodMenu]);

  function onSelectCategory(category) {
    //filter restaurant
    setSelectedCategory(category.name);
  }

  function renderHeader() {
    return (
      <View style={styles.containerHeader}>
        <TouchableOpacity
          style={{
            width: 100,
            height: 28,
            backgroundColor:
              foodMenu == true ? "rgba(248, 148, 6, 1)" : COLORS.white,
            alignSelf: "center",
            borderRadius: 5,
            borderColor: foodMenu == true ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.2)",
            borderWidth: 1,
          }}
          onPress={() => {
            setSelectedCategory(null);
            setFoodMenu(true);
          }}
        >
          <Text style={styles.text}>Food</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 100,
            height: 28,
            backgroundColor:
              foodMenu == false ? "rgba(248, 148, 6, 1)" : COLORS.white,
            alignSelf: "center",
            borderRadius: 5,
            borderColor:
              foodMenu == false ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.2)",
            borderWidth: 1,
          }}
          onPress={() => {
            setSelectedCategory(null);
            setFoodMenu(false);
          }}
        >
          <Text style={styles.text2}>Drinks</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderMainCategories() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            paddingHorizontal: SIZES.padding,
            paddingBottom: 0,
            backgroundColor:
              selectedCategory == item.name ? COLORS.primary : COLORS.white,
            borderRadius: 7,
            alignItems: "center",
            justifyContent: "center",
            marginRight: SIZES.padding,
            marginLeft: SIZES.padding,
            ...styles.shadow,
          }}
          onPress={() => onSelectCategory(item)}
        >
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                selectedCategory == item.name ? COLORS.white : COLORS.lightGray,
            }}
          >
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </View>

          <Text
            style={{
              marginTop: SIZES.padding,
              color:
                selectedCategory == item.name ? COLORS.white : COLORS.black,
              ...FONTS.body5,
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ padding: 0, marginTop: 10 }}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: SIZES.padding * 1.5 }}
        />
      </View>
    );
  }

  function renderMenuList() {
    let count = 0;
    const renderItem = ({ item }) => (
      <View style={{ marginBottom: SIZES.padding * 2 }}>
        {/* Image */}

        <View
          style={{
            marginBottom: SIZES.padding,
          }}
        >
          {count == 1 ? <Text>Hello</Text> : null}

          <Image
            source={{ uri: item.photo }}
            resizeMode="cover"
            style={{
              width: "100%",
              height: 250,
              borderRadius: SIZES.radius,
            }}
          />
        </View>

        {/* Menu Item Info */}
        <Text style={{ ...FONTS.body2 }}>{item.name}</Text>
        <Text style={{ ...FONTS.body4 }}>{item.description}</Text>

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
            source={item.veg ? icons.vegmark : icons.nonvegmark}
            style={{
              height: 20,
              width: 20,
              marginRight: 10,
            }}
          />
          <Text style={{ ...FONTS.body5 }}>{item.price}</Text>

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
            {/*foodMenu ? <Touchable><Text>ADD</Text></Touchable> : <Text>+</Text> <Text> 1 </Text> <Touchable> - </Touchable>*/}
            <TouchableOpacity
              style={{ width: 20 }}
              onPress={() => {
                let orderItems = a.orderList;
                if (
                  !a.orderList.some((orderItem) => orderItem.name == item.name)
                ) {
                  orderItems.push({
                    name: item.name,
                    quantity: 1,
                    photo: item.photo,
                  });
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
        data={menuItems}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderMainCategories()}
      {renderMenuList()}
    </SafeAreaView>
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

export default Home;
