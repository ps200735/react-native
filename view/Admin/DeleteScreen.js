
import React from 'react';
import { View, SafeAreaView, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors'

const DeleteScreen = ({ navigation, route }) => {

    const deleteData = async (item) => {
        try {
        var myHeaders = new Headers();
        console.log('deleteData', item);
        myHeaders.append('Content-Type', 'application/json');
      
            const response = await fetch('http://127.0.0.1:8000/api/Products/delete/' + item.id, {
                method: 'DELETE',
                headers: myHeaders,
            })
            if (response.status == 200) {

                navigation.navigate('Producten');
            } else {
                alert("Er is een fout opgetreden");
                Alert.alert("Er is een fout opgetreden");
            }
        }
        catch (error) {
            alert("Er is een fout opgetreden");
            Alert.alert("Er is een fout opgetreden");
            console.error(error);
        }
       
    };






    const product = route.params;
    console.log(product);
    console.log(route);
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}>
            <View style={style.header}>
                <Icon name="arrow-back" size={28} onPress={() => navigation.navigate('Producten')} />

            </View>
            <View style={style.imageContainer}>
                <Image source={{ uri: product.image }} style={{ resizeMode: 'contain', flex: 1, width: 150, height: 150 }} />
            </View>
            <View style={style.detailsContainer}>
                <View
                    style={{
                        marginLeft: 20,
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                    }}>
                    <View style={style.line} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Best choice</Text>
                </View>
                <View
                    style={{
                        marginLeft: 20,
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{product.name}</Text>
                    <View style={style.priceTag}>
                        <Text
                            style={{
                                marginLeft: 15,
                                color: COLORS.white,
                                fontWeight: 'bold',
                                fontSize: 16,
                            }}>
                            ${product.price}
                        </Text>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>description</Text>
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 16,
                            lineHeight: 22,
                            marginTop: 10,
                        }}>
                        {product.description}
                    </Text>
                    <View
                        style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>


                        <View style={style.buyBtn}>
                            <TouchableOpacity onPress={() => deleteData(product)}>
                                <Text
                                    style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>
                                    Delete
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageContainer: {
        flex: 0.2,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsContainer: {
        flex: 0.55,
        backgroundColor: COLORS.light,
        marginHorizontal: 7,
        marginBottom: 7,
        borderRadius: 20,
        marginTop: 30,
        paddingTop: 30,
    },
    line: {
        width: 25,
        height: 2,
        backgroundColor: COLORS.dark,
        marginBottom: 5,
        marginRight: 3,
    },
    borderBtn: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 40,
    },
    borderBtnText: { fontWeight: 'bold', fontSize: 28 },
    buyBtn: {
        width: 130,
        height: 50,
        backgroundColor: COLORS.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    priceTag: {
        backgroundColor: COLORS.green,
        width: 80,
        height: 40,
        justifyContent: 'center',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
    },
});


export default DeleteScreen



