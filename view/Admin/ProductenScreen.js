
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from '../../consts/colors'


const ProductenScreen = ({ navigation }) => {

  const [Producten, setProducten] = useState([]);
  const isFocused = useIsFocused();
  const [user, setUser] = useState();

  const getProducten = async () => {
    try {
      console.log("getUserData");
      let response = await fetch('http://127.0.0.1:8000/api/Products/');
      let json = await response.json();
      setProducten(json);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    alert("Uitgelogd");
    navigation.navigate("login");
  };
  


  useEffect(() => {
    if (isFocused) {
      getProducten();
    }
  }, [isFocused]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Detail', item)}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            padding: 5,
          }}>
          <Text style={{ fontWeight: 'bold' }}>{item.name} </Text>
          <Button title='DEL' onPress={() => navigation.navigate('ProductenVerwijderen', item)}></Button>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Welcome to</Text>
          <Text
            style={{ fontSize: 38, color: COLORS.green, fontWeight: "bold" }}
          >
            Yazan And Hamzah Pizza
          </Text>
        </View>

        <View >
          <TouchableOpacity onPress={logout}  >
            <Icon name="logout" size={20} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ProductenAanmaken')} >
            <Icon
              name="add"
              size={18}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={Producten}
        renderItem={renderItem}
        keyExtractor={(item) => {
          return item.id;
        }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1, paddingHorizontal: 20, backgroundColor: 'white',
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

//make this component available to the app
export default ProductenScreen;
