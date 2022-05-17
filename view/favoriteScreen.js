
import React from 'react'
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useState, useEffect } from "react";
const width = Dimensions.get("window").width / 2 - 30;

import COLORS from "../consts/colors";
const favoriteScreen = ({ navigation, route }) => {

  console.log(route);
  const userID = route.params;
  const [Products, setProducts] = useState([]);
  

  const getAllProducts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/Favorietproducts?User=' + userID.toString());
      const json = await response.json();
      if (response.status == 200) {

        console.log(json);
        loadProducts(json);
      } else {
        alert("Er is een fout opgetreden");
        Alert.alert("Er is een fout opgetreden");
      }
    } catch (error) {
      alert("Er is een fout opgetreden");
      Alert.alert("Er is een fout opgetreden");
      console.error(error);
    }
  };


  const loadProducts = async (data) => {
    let _ProductsData = await Promise.all(
      data.map(async (Products) => {
        let ProductsRecord = await getProducts(Products);
        console.log(ProductsRecord);
        return ProductsRecord;
      })
    );
    console.log(_ProductsData);
    setProducts(_ProductsData);
  };

  const getProducts= async ({ product_id }) => {

    const URL = 'http://127.0.0.1:8000/api/Products?ID=' + product_id.toString();
    return new Promise((resolve, reject) => {
      fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        });
    });
  };

 

  useEffect(() => {
    getAllProducts();
  }, []);

  const logout = () => {
    alert("Uitgelogd");
    Alert.alert("Uitgelogd");
    navigation.navigate("login");
  };

  const Card = ({ produc }) => {




    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Details", produc)}
      >
        <View style={style.card}>
          <View style={{ alignItems: "flex-end" }}>

          </View>

          <View
            style={{
              height: 100,
              alignItems: "center",
              color: "red",
            }}
          >
            <Image
              source={{ uri: produc.image }}
              style={{
                flex: 2,
                resizeMode: "contain",
                width: 150,
                height: 150,
              }}
            />
          </View>

          <Text style={{ fontWeight: "bold", fontSize: 17, marginTop: 10 }}>
            {produc.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 19, fontWeight: "bold" }}>
              ${produc.price}
            </Text>
            <View
              style={{
                height: 25,
                width: 25,
                backgroundColor: COLORS.green,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: COLORS.white,
                  fontWeight: "bold",
                }}
              >
                +
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white }}
    >
      <View style={style.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
        <Icon name="shopping-cart" size={28} />
        <View >
          <TouchableOpacity onPress={logout} >
            <Icon name="logout" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={Products}
        renderItem={({ item }) => {
          console.log(item);
          return <Card produc={item[0]} />;
        }}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  categoryText: { fontSize: 16, color: "grey", fontWeight: "bold" },
  categoryTextSelected: {
    color: COLORS.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
  },
  card: {
    height: 225,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    justifyContent: "center",
    alignItems: "center",
  },
});



export default favoriteScreen;
