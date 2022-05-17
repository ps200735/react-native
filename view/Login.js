import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  Alert,
  Button,
} from "react-native";
import { useIsFocused } from '@react-navigation/native';

const Login = ({ navigation }) => {
  const [User, setUser] = useState([]);
  const [Email, seEmail] = useState("");
  const [Password, setPassword] = useState("");
  const isFocused = useIsFocused();

  const getUser = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/User"
      );
      const json = await response.json();
      if (response.status == 200) {
        console.log(response.status);
        setUser(json);
      } else {
      }
    } catch (error) {
      alert("Fout bij aanroepen van api");
      Alert.alert("Fout bij aanroepen van api");
      console.error(error);
    }
  };

  const login = () => {
    if (Email == "") {
      alert("Email is leeg");
      Alert.alert("Email is leeg");
    }
    if (Password == "") {
      alert("Password is leeg");
      Alert.alert("Password is leeg");

    }

    if (Email != "" && Password != "") {
      User.filter((item) => item.email == Email).map((item) => {
        if (Email == item.email && Password == item.password) {
          alert("Login succesvol");
          Alert.alert("Login succesvol");
          if (item.rol == "Admin") {
            navigation.navigate("Admin", {
              screen: 'Producten',
            });
          } else {
            navigation.navigate("Klanten", {
              screen: 'Home',
              params: { User: item },
            });
          }
          
        }
        else{
          alert("gegevens kloppen neit");
          Alert.alert("gegevens kloppen neit");
        }
      }
      );
    }
    else
    {
      alert(" vul u gegevens in ");
      Alert.alert("vul u gegevens in");
    }
   
  };


  useEffect(() => {
   
    if (isFocused) {
      getUser();
    }
   
  }, [isFocused]);
  return (
    <View style={styles.body}>
      <Text style={styles.text}> Yazan And Hamzah Pizza</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Email"
        onChangeText={(value) => seEmail(value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your Password"
        onChangeText={(value) => setPassword(value)}
      />

      <>
        <Button title="Login" color="#1eb900" onPress={() => login()}></Button>
      </>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  logo: {
    width: 100,
    height: 100,
    margin: 20,
    
  },
  text: {
    fontSize: 30,
    color: "#ffffff",
    marginBottom: 130,
    color: '#00B761',
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
    color: '#00B761',
  },
});
