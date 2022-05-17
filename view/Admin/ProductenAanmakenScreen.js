import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Picker,
  Alert,
} from "react-native";
import COLORS from '../../consts/colors'
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProductenAanmakenScreen = ({ navigation }) => {
  

  const [choosenValue, setChoosenValue] = useState(1);
  const [choosenIndex, setChoosenIndex] = useState(1);
  const [categorien, setcategories] = useState([]);
  const [product, setproduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category_id: "",
   
  });
 


  const [loading, setLoading] = useState(false);

  const getAllCategory = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/Category/');
      const json = await response.json();
      if (response.status == 200) {
        setcategories(json);

      } else {
      }
    } catch (error) {
      alert("Fout bij aanroepen van api");
      Alert.alert('error', 'Fout bij aanroepen van api');	
      console.error(error);
    }
  };




  useEffect(() => {
    getAllCategory();
  }, []);




  const onChangename = (value) => {
    setproduct({ ...product, name: value });
  };

  const onChangeprice = (value) => {
    setproduct({ ...product, price: value });
  };

  const onChangedescription = (value) => {
    setproduct({ ...product, description: value });
  };

  const onChangeimage = (value) => {
    setproduct({ ...product, image: value });
  };

  
  const saveData = async () => {
    
      setLoading(true);
      var myHeaders = new Headers();


      myHeaders.append("Content-Type", "application/json");
      let requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: product.name,
          price: product.price,
          description: product.description,
          image: product.image,
          category_id: product.category_id,
        })
      };
      try {
      

        const response = await fetch("http://127.0.0.1:8000/api/Products", requestOptions);
        if (response.status == 201) {
          setLoading(false);
          navigation.navigate('Producten');
        }
        else {
          setLoading(false);
          alert("Er is een fout opgetreden probeer het opnieuw");
          Alert.alert("Er is een fout opgetreden probeer het opnieuw");
        }
      } catch (error) {
        alert("Er is een fout opgetreden");
        Alert.alert("Er is een fout opgetreden");
        console.error(error);
        console.log('responsesaaaaaaadsdad');
    
      }
    
  };

  const Opslaan = () => {
    if (product.name == "" || product.price == "" || product.description == "" || product.image == "" || product.category_id == "") {
      alert("Vul alle velden in");
      Alert.alert("Vul alle velden in");
    }
    else { saveData(); }
}

  return (
    <View style={styles.container}>
      <View>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />

        <Text style={{ fontSize: 25, fontWeight: "bold" }}>Welcome to</Text>
        <Text
          style={{ fontSize: 38, color: COLORS.green, fontWeight: "bold" }}
        >
          Yazan And Hamzah Pizza
        </Text>
      </View>
      <TextInput
        placeholder={"Name"}
        onChangeText={(value) => onChangename(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={"Price"}
        onChangeText={(value) => onChangeprice(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={"Description"}
        onChangeText={(value) => onChangedescription(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={"ImageURl"}
        onChangeText={(value) => onChangeimage(value)}
        style={styles.input}
      />
      <Picker
       
        onValueChange={(itemValue, itemIndex) => {

          setproduct({ ...product, category_id: itemValue });

          setChoosenValue(itemValue);
          setChoosenIndex(itemIndex);
        }}
      >
        <Picker.Item value={0} label=''/>
        {
          categorien.map(item => {
            return <Picker.Item value={item.id} label={item.name} />
          })
        }
      </Picker>

      <TouchableOpacity onPress={Opslaan}  >
        <View style={{ backgroundColor: "blue", padding: 10 }}>
          <Text style={{ color: "white", textAlign: "center" }}>
            {loading ? "Menyimpan..." : "Create"}
            {loading == true ? <Icon name="cached" size={28} color="white" /> : null}
          
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  

}


const styles = StyleSheet.create({
  
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
  },
  container: {
    flex: 1, paddingHorizontal: 20, backgroundColor: 'white',
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ProductenAanmakenScreen;