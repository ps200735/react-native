import React from "react";
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


import COLORS from "../consts/colors";

const width = Dimensions.get("window").width / 2 - 30;


const HomeScreen = ({ navigation, route }) => {

  console.log(route);
  const userID = route.params.User.id;
  console.log(userID);
  const [categorien, setcategories] = useState([]);
  const [Products, setProducts] = useState([]);


  const getAllCategory = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/Category/');
      const json = await response.json();
      if (response.status == 200) {
        json.unshift({ id: 0, name: "All" });
        setcategories(json);

      } else {
      }
    } catch (error) {
      alert("Er is een fout opgetreden");
      Alert.alert("Er is een fout opgetreden");
      console.error(error);
    }
  };


  const getAllCategoryProducts = async (id) => {

    if (id == 0) {
      getAllProducts();
    } else {
      const url = `http://127.0.0.1:8000/api/Category/` + id.toString() + `/Products`;

      try {
        const response = await fetch(url);
        const json = await response.json();
        if (response.status == 200) {
          setProducts(json);

        } else {
        }
      } catch (error) {
        alert("Er is een fout opgetreden");
        Alert.alert("Er is een fout opgetreden");
        console.error(error);
      }
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/Products/');
      const json = await response.json();
      if (response.status == 200) {
        setProducts(json);
      } else {
      }
    } catch (error) {
      alert("Er is een fout opgetreden");
      Alert.alert("Er is een fout opgetreden");
      console.error(error);
    }
  };



  const getAllProductsBySearch = async (value) => {
    if (value.length == 0) {
      getAllCategoryProducts(catergoryIndex);

    } else {
      if (catergoryIndex == 0) {
        const ur = `http://127.0.0.1:8000/api/Products?name=` + value.toString();
        try {
          const response = await fetch(ur);
          const json = await response.json();
          if (response.status == 200) {
            setProducts(json);

          } else {
          }
        } catch (error) {
          alert("Er is een fout opgetreden");
          Alert.alert("Er is een fout opgetreden");
          console.error(error);
        }
      }
      else {
        const url = `http://127.0.0.1:8000/api/Category/` + catergoryIndex.toString() + `/Products?name=` + value.toString();

        try {
          const response = await fetch(url);
          const json = await response.json();
          if (response.status == 200) {
            setProducts(json);

          } else {
          }
        } catch (error) {
          alert("Er is een fout opgetreden");
          Alert.alert("Er is een fout opgetreden");
          console.error(error);
        }
      }

    }
  };

  const ToevoegenToFavorite = async (id) => {
    try {
      var myHeaders = new Headers();


      myHeaders.append("Content-Type", "application/json");

      const response = await fetch("http://127.0.0.1:8000/api/Favorietproducts", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          user_id: userID,
          product_id: id,
        }),
      });

      if (response.status == 201) {
        alert("het is toegevoert toe Favorite");
        Alert.alert("het is toegevoert toe Favorite");
        console.log(response.status);
      }
      else {
        alert("Er is een fout opgetreden");
        Alert.alert("Er is een fout opgetreden");
        console.log(response.status);
      }
    } catch (error) {
      alert("Er is een fout opgetreden");
      Alert.alert("Er is een fout opgetreden");
      console.error(error);
    }

  };




  useEffect(() => {
    getAllCategory();
    getAllProducts();
  }, []);


  const logout = () => {
    alert("Uitgelogd");
    navigation.navigate("login");
  };



  const Selctcatergory = (index) => {
    setCategoryIndex(index);
    getAllCategoryProducts(index);
  };


  const [catergoryIndex, setCategoryIndex] = React.useState(0);

  const CategoryList = () => {
    return (
      <View style={style.categoryContainer}>
        {categorien.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => Selctcatergory(index)}
          >
            <Text
              style={[
                style.categoryText,
                catergoryIndex === index && style.categoryTextSelected,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const onChangeaSearch = (value) => {

    getAllProductsBySearch(value);

  };



  const Card = ({ item }) => {




    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Details", item)}
      >
        <View style={style.card}>
          <View style={{ alignItems: "flex-end" }}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.2) ",
              }}
            >
              <TouchableOpacity onPress={() => ToevoegenToFavorite(item.id)}  >

                <Icon
                  name="favorite"
                  size={18}
                  color={COLORS.red}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              height: 100,
              alignItems: "center",
              color: "red",
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                flex: 2,
                resizeMode: "contain",
                width: 150,
                height: 150,
              }}
            />
          </View>

          <Text style={{ fontWeight: "bold", fontSize: 17, marginTop: 10 }}>
            {item.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 19, fontWeight: "bold" }}>
              ${item.price}
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
        <View>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Welcome to</Text>
          <Text
            style={{ fontSize: 38, color: COLORS.green, fontWeight: "bold" }}
          >
            Yazan And Hamzah Pizza
          </Text>
        </View>

        <View >
          <TouchableOpacity onPress={logout} >
            <Icon name="logout" size={20} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('favorite', userID)}>
            <Icon
              name="favorite"
              size={18}
              color={COLORS.red}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 30, flexDirection: "row" }}>
        <View style={style.searchContainer}>
          <Icon name="search" size={25} style={{ marginLeft: 20 }} />
          <TextInput placeholder="Search" style={style.input} onChangeText={(value) => onChangeaSearch(value)} />
        </View>
        <View style={style.sortBtn}>
          <Icon name="sort" size={30} color={COLORS.white} />
        </View>
      </View>
      <CategoryList />
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
          return <Card item={item} />;
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
export default HomeScreen;
